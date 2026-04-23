export type MethodologyCategory =
  | "Rules of thumb"
  | "Investor metrics"
  | "Strategy"
  | "Stress testing"
  | "Comparative";

export interface Methodology {
  index: number;
  title: string;
  shortTitle?: string;
  category: MethodologyCategory;
  description: string;
  formula?: string;
  whenToUse?: string;
}

export const METHODOLOGIES: Methodology[] = [
  {
    index: 1,
    title: "The 1% Rule",
    category: "Rules of thumb",
    description:
      "Monthly gross rent should equal at least 1% of the all-in purchase price. A fast filter for whether a property merits deeper underwriting.",
    formula: "(Monthly rent ÷ Purchase price) × 100 ≥ 1.0",
    whenToUse: "First-pass screening on listings before pulling expense data.",
  },
  {
    index: 2,
    title: "The 2% Rule",
    category: "Rules of thumb",
    description:
      "An aggressive cousin of the 1% rule, common in lower-cost markets. Few markets clear it today.",
    formula: "(Monthly rent ÷ Purchase price) × 100 ≥ 2.0",
  },
  {
    index: 3,
    title: "The 50% Rule",
    category: "Rules of thumb",
    description:
      "Operating expenses, excluding debt service, will average roughly 50% of gross rents over a full holding period.",
    formula: "Estimated OpEx = Gross rents × 0.50",
  },
  {
    index: 4,
    title: "The 70% Rule",
    category: "Rules of thumb",
    description:
      "For flips and BRRRR exits: maximum allowable offer equals 70% of after-repair value, less rehab.",
    formula: "MAO = (ARV × 0.70) − Rehab",
  },
  {
    index: 5,
    title: "$100 per door rule",
    category: "Rules of thumb",
    description:
      "Each unit should produce at least $100 of monthly cash flow after all expenses and debt service.",
  },
  {
    index: 6,
    title: "Gross Rent Multiplier",
    shortTitle: "GRM",
    category: "Rules of thumb",
    description:
      "Purchase price divided by annual gross rent. A market-relative valuation lens used by appraisers.",
    formula: "GRM = Purchase price ÷ Annual gross rent",
  },
  {
    index: 7,
    title: "Capitalization Rate",
    shortTitle: "Cap rate",
    category: "Investor metrics",
    description:
      "Net operating income as a percentage of purchase price. The closest thing to a market-comparable yield.",
    formula: "Cap rate = NOI ÷ Purchase price",
  },
  {
    index: 8,
    title: "Cash-on-cash return",
    category: "Investor metrics",
    description:
      "Annual pre-tax cash flow divided by the cash actually invested. The investor-equity yield.",
    formula: "CoC = Annual cash flow ÷ Total cash invested",
  },
  {
    index: 9,
    title: "Net Operating Income",
    shortTitle: "NOI",
    category: "Investor metrics",
    description:
      "Income from operations minus all operating expenses, before debt service and capital expenditures.",
    formula: "NOI = Effective gross income − Operating expenses",
  },
  {
    index: 10,
    title: "Debt Service Coverage Ratio",
    shortTitle: "DSCR",
    category: "Investor metrics",
    description:
      "NOI divided by annual debt service. The metric most lenders underwrite to. Below 1.20 typically fails.",
    formula: "DSCR = NOI ÷ Annual debt service",
  },
  {
    index: 11,
    title: "Total return on investment",
    shortTitle: "Total ROI",
    category: "Investor metrics",
    description:
      "Sum of cash flow, principal paydown, and assumed appreciation, expressed as a return on cash invested.",
  },
  {
    index: 12,
    title: "Five-year IRR",
    category: "Investor metrics",
    description:
      "Internal rate of return over a five-year hold, including a modeled sale at exit. Solved iteratively via Newton-Raphson.",
    formula: "Σ CF_t ÷ (1 + IRR)^t = 0",
  },
  {
    index: 13,
    title: "Break-even ratio",
    category: "Investor metrics",
    description:
      "How much of gross rent is consumed by expenses plus debt service. Lender comfort zone is below 85%.",
    formula: "BER = (OpEx + Debt service) ÷ Gross income",
  },
  {
    index: 14,
    title: "BRRRR analysis",
    category: "Strategy",
    description:
      "Buy, rehab, rent, refinance, repeat. Models capital recovery at the cash-out refinance and the resulting infinite-return potential.",
  },
  {
    index: 15,
    title: "Fix and flip projection",
    category: "Strategy",
    description:
      "Models gross profit, ROI, and annualized return on a renovate-and-resell exit with carrying costs.",
  },
  {
    index: 16,
    title: "House hack potential",
    category: "Strategy",
    description:
      "Owner-occupies one unit, rents the others. Models effective housing cost and FHA financing leverage.",
  },
  {
    index: 17,
    title: "Short-term rental projection",
    category: "Strategy",
    description:
      "Models a short-term rental P&L using occupancy and ADR assumptions, accounting for cleaning, platform fees, and seasonality.",
  },
  {
    index: 18,
    title: "Vacancy stress test",
    category: "Stress testing",
    description:
      "Re-runs the model at 10%, 15%, 20%, and 25% vacancy to find the point at which cash flow goes negative.",
  },
  {
    index: 19,
    title: "Interest rate stress test",
    category: "Stress testing",
    description:
      "Re-prices the loan at +1%, +2%, and +3% above the assumed rate. Surfaces refinance and ARM exposure.",
  },
  {
    index: 20,
    title: "Rent decline stress test",
    category: "Stress testing",
    description:
      "Models cash flow under 5%, 10%, and 15% rent declines. The stress most investors fail to model at all.",
  },
  {
    index: 21,
    title: "CapEx catastrophe scenario",
    category: "Stress testing",
    description:
      "Drops a $10K, $25K, and $50K capital expense onto year one. Tests the deal's resilience to a real-world surprise.",
  },
  {
    index: 22,
    title: "Opportunity cost comparison",
    category: "Comparative",
    description:
      "Benchmarks the deal against equivalent capital deployed into the S&P 500, a high-yield savings account, ten-year Treasuries, and a public REIT index.",
  },
  {
    index: 23,
    title: "Composite score",
    category: "Comparative",
    description:
      "A 0-100 weighted score across the eight load-bearing metrics, returned with a letter grade and the metrics that pulled it up or down.",
  },
];

export const CATEGORIES: { name: MethodologyCategory; blurb: string }[] = [
  {
    name: "Rules of thumb",
    blurb: "Fast filters experienced investors use to triage listings before opening a spreadsheet.",
  },
  {
    name: "Investor metrics",
    blurb: "The seven calculations institutional underwriters depend on, including the one your lender cares about most.",
  },
  {
    name: "Strategy",
    blurb: "Different exits demand different math. We model BRRRR, flip, house hack, and short-term rental projections discretely.",
  },
  {
    name: "Stress testing",
    blurb: "Most calculators show one happy-path number. We re-run the deal under vacancy, rate, rent, and CapEx shocks.",
  },
  {
    name: "Comparative",
    blurb: "Every deal competes with the S&P, Treasuries, and REITs. We benchmark explicitly so you see the hurdle rate.",
  },
];
