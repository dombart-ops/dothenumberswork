import { NextResponse } from "next/server";
import {
  calculateDealMetrics,
  generateMethodologyResults,
  encodeAnalysisId,
  type DealInputs,
} from "@/lib/analyzer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUIRED: Array<keyof DealInputs> = [
  "purchasePrice",
  "monthlyGrossRent",
  "downPayment",
  "interestRate",
];

function coerceNumber(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeInputs(raw: Record<string, unknown>): {
  inputs?: DealInputs;
  missing?: string[];
} {
  const numericKeys: Array<keyof DealInputs> = [
    "purchasePrice",
    "arv",
    "numberOfUnits",
    "downPayment",
    "loanAmount",
    "interestRate",
    "loanTerm",
    "closingCosts",
    "monthlyGrossRent",
    "otherMonthlyIncome",
    "vacancyRate",
    "annualPropertyTaxes",
    "annualInsurance",
    "monthlyHOA",
    "propertyManagementPercent",
    "maintenancePercent",
    "capexPercent",
    "utilitiesMonthly",
    "otherMonthlyExpenses",
    "rehabCost",
    "rehabMonths",
    "holdingCostsMonthly",
    "sellingCostsPercent",
    "targetReturn",
    "appreciationRate",
  ];

  const out: Record<string, unknown> = {};
  for (const k of numericKeys) {
    const n = coerceNumber(raw[k]);
    if (n !== undefined) out[k] = n;
  }
  if (typeof raw.propertyType === "string") out.propertyType = raw.propertyType;
  if (typeof raw.investmentStrategy === "string") {
    out.investmentStrategy = raw.investmentStrategy;
  }

  // Defaults that the analyzer expects to exist
  if (out.numberOfUnits === undefined) out.numberOfUnits = 1;
  if (out.loanAmount === undefined && out.purchasePrice !== undefined && out.downPayment !== undefined) {
    out.loanAmount = (out.purchasePrice as number) - (out.downPayment as number);
  }
  if (out.closingCosts === undefined && out.purchasePrice !== undefined) {
    out.closingCosts = Math.round((out.purchasePrice as number) * 0.03);
  }
  if (out.annualPropertyTaxes === undefined && out.purchasePrice !== undefined) {
    out.annualPropertyTaxes = Math.round((out.purchasePrice as number) * 0.011);
  }
  if (out.annualInsurance === undefined && out.purchasePrice !== undefined) {
    out.annualInsurance = Math.round((out.purchasePrice as number) * 0.0045);
  }

  const missing = REQUIRED.filter((k) => out[k] === undefined);
  if (missing.length > 0) return { missing };

  return { inputs: out as unknown as DealInputs };
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { inputs, missing } = normalizeInputs(body);
  if (!inputs) {
    return NextResponse.json(
      { error: "Missing required fields", missing },
      { status: 400 }
    );
  }

  try {
    const metrics = calculateDealMetrics(inputs);
    const results = generateMethodologyResults(metrics, inputs);
    const id = encodeAnalysisId(inputs);

    // Teaser preview: first 3 unlocked, rest blurred client-side
    const teaserResults = results.map((r, index) => ({
      ...r,
      unlocked: index < 3,
      blurred: index >= 3,
    }));

    return NextResponse.json({
      success: true,
      analysisId: id,
      metrics: {
        compositeScore: metrics.compositeScore,
        monthlyCashFlow: Math.round(metrics.monthlyCashFlow),
        cashOnCashReturn: (metrics.cashOnCashReturn * 100).toFixed(2) + "%",
        capRate: (metrics.capRate * 100).toFixed(2) + "%",
      },
      results: teaserResults,
      lockedCount: results.length - 3,
      price: 3000,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Failed to analyze deal" }, { status: 500 });
  }
}
