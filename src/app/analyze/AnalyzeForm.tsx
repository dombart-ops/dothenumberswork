"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = Record<string, string>;

const DEFAULTS: FormState = {
  // Property
  purchasePrice: "300000",
  arv: "",
  numberOfUnits: "1",
  propertyType: "single_family",
  // Financing
  downPayment: "60000",
  loanAmount: "",
  interestRate: "7.0",
  loanTerm: "30",
  closingCosts: "",
  // Income
  monthlyGrossRent: "2400",
  otherMonthlyIncome: "0",
  vacancyRate: "0.08",
  // Expenses
  annualPropertyTaxes: "",
  annualInsurance: "",
  monthlyHOA: "0",
  propertyManagementPercent: "0.10",
  maintenancePercent: "0.05",
  capexPercent: "0.05",
  utilitiesMonthly: "0",
  otherMonthlyExpenses: "0",
  // Rehab / Flip
  rehabCost: "0",
  rehabMonths: "0",
  holdingCostsMonthly: "0",
  sellingCostsPercent: "0.08",
  // Context
  appreciationRate: "0.03",
  investmentStrategy: "buy_and_hold",
};

export default function AnalyzeForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const derivedLoan = useMemo(() => {
    const pp = parseFloat(form.purchasePrice);
    const dp = parseFloat(form.downPayment);
    if (Number.isFinite(pp) && Number.isFinite(dp)) {
      return Math.max(0, pp - dp).toLocaleString();
    }
    return "";
  }, [form.purchasePrice, form.downPayment]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(form)) {
        if (v === "" || v === undefined) continue;
        payload[k] = v;
      }
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        const missing = Array.isArray(data.missing) ? data.missing.join(", ") : "";
        throw new Error(
          data.error +
            (missing ? `: ${missing}` : "") || "Analysis failed"
        );
      }
      router.push(`/results/${data.analysisId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <Section title="Property" eyebrow="Section 01">
        <Field label="Purchase price" suffix="USD" required>
          <input
            type="number"
            min="0"
            step="1000"
            required
            value={form.purchasePrice}
            onChange={(e) => set("purchasePrice", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="After-repair value (ARV)" suffix="USD" hint="Required for BRRRR or flip strategies">
          <input
            type="number"
            min="0"
            step="1000"
            value={form.arv}
            onChange={(e) => set("arv", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Number of units">
          <input
            type="number"
            min="1"
            step="1"
            value={form.numberOfUnits}
            onChange={(e) => set("numberOfUnits", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Property type">
          <select
            value={form.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            className={inputClass}
          >
            <option value="single_family">Single family</option>
            <option value="duplex">Duplex</option>
            <option value="triplex">Triplex</option>
            <option value="fourplex">Fourplex</option>
            <option value="small_multifamily">Small multifamily (5-12)</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </Field>
      </Section>

      <Section title="Financing" eyebrow="Section 02">
        <Field label="Down payment" suffix="USD" required>
          <input
            type="number"
            min="0"
            step="1000"
            required
            value={form.downPayment}
            onChange={(e) => set("downPayment", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Loan amount"
          suffix="USD"
          hint={derivedLoan ? `Auto-calculated: $${derivedLoan}` : "Defaults to purchase price minus down payment"}
        >
          <input
            type="number"
            min="0"
            step="1000"
            value={form.loanAmount}
            onChange={(e) => set("loanAmount", e.target.value)}
            placeholder={derivedLoan}
            className={inputClass}
          />
        </Field>
        <Field label="Interest rate" suffix="%" required>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={form.interestRate}
            onChange={(e) => set("interestRate", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Loan term" suffix="years">
          <input
            type="number"
            min="1"
            step="1"
            value={form.loanTerm}
            onChange={(e) => set("loanTerm", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Closing costs"
          suffix="USD"
          hint="Defaults to 3% of purchase price"
        >
          <input
            type="number"
            min="0"
            step="100"
            value={form.closingCosts}
            onChange={(e) => set("closingCosts", e.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Income" eyebrow="Section 03">
        <Field label="Monthly gross rent" suffix="USD" required>
          <input
            type="number"
            min="0"
            step="50"
            required
            value={form.monthlyGrossRent}
            onChange={(e) => set("monthlyGrossRent", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Other monthly income" suffix="USD" hint="Laundry, parking, storage">
          <input
            type="number"
            min="0"
            step="10"
            value={form.otherMonthlyIncome}
            onChange={(e) => set("otherMonthlyIncome", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Vacancy rate" hint="Decimal: 0.08 = 8%">
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={form.vacancyRate}
            onChange={(e) => set("vacancyRate", e.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Expenses" eyebrow="Section 04">
        <Field
          label="Annual property taxes"
          suffix="USD"
          hint="Defaults to 1.1% of purchase price"
        >
          <input
            type="number"
            min="0"
            step="100"
            value={form.annualPropertyTaxes}
            onChange={(e) => set("annualPropertyTaxes", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Annual insurance"
          suffix="USD"
          hint="Defaults to 0.45% of purchase price"
        >
          <input
            type="number"
            min="0"
            step="50"
            value={form.annualInsurance}
            onChange={(e) => set("annualInsurance", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Monthly HOA" suffix="USD">
          <input
            type="number"
            min="0"
            step="10"
            value={form.monthlyHOA}
            onChange={(e) => set("monthlyHOA", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Property management" hint="Decimal: 0.10 = 10% of rent">
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={form.propertyManagementPercent}
            onChange={(e) => set("propertyManagementPercent", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Maintenance reserve" hint="Decimal: 0.05 = 5% of rent">
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={form.maintenancePercent}
            onChange={(e) => set("maintenancePercent", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="CapEx reserve" hint="Decimal: 0.05 = 5% of rent">
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={form.capexPercent}
            onChange={(e) => set("capexPercent", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Utilities monthly" suffix="USD" hint="Owner-paid only">
          <input
            type="number"
            min="0"
            step="10"
            value={form.utilitiesMonthly}
            onChange={(e) => set("utilitiesMonthly", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Other monthly expenses" suffix="USD">
          <input
            type="number"
            min="0"
            step="10"
            value={form.otherMonthlyExpenses}
            onChange={(e) => set("otherMonthlyExpenses", e.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Strategy and rehab" eyebrow="Section 05">
        <Field label="Investment strategy">
          <select
            value={form.investmentStrategy}
            onChange={(e) => set("investmentStrategy", e.target.value)}
            className={inputClass}
          >
            <option value="buy_and_hold">Buy and hold</option>
            <option value="brrrr">BRRRR</option>
            <option value="fix_and_flip">Fix and flip</option>
            <option value="house_hack">House hack</option>
            <option value="short_term_rental">Short-term rental</option>
          </select>
        </Field>
        <Field label="Rehab cost" suffix="USD">
          <input
            type="number"
            min="0"
            step="500"
            value={form.rehabCost}
            onChange={(e) => set("rehabCost", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Rehab duration" suffix="months">
          <input
            type="number"
            min="0"
            step="1"
            value={form.rehabMonths}
            onChange={(e) => set("rehabMonths", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Monthly holding costs" suffix="USD">
          <input
            type="number"
            min="0"
            step="50"
            value={form.holdingCostsMonthly}
            onChange={(e) => set("holdingCostsMonthly", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Selling costs" hint="Decimal: 0.08 = 8% of ARV">
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={form.sellingCostsPercent}
            onChange={(e) => set("sellingCostsPercent", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Appreciation rate" hint="Decimal: 0.03 = 3% per year">
          <input
            type="number"
            min="-0.2"
            max="0.5"
            step="0.005"
            value={form.appreciationRate}
            onChange={(e) => set("appreciationRate", e.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      {error && (
        <div className="border border-rust-200 bg-rust-50 px-5 py-4 text-[0.92rem] text-rust">
          {error}
        </div>
      )}

      <div className="border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[0.85rem] text-ink-400">
          The first three methodologies preview free. Full report is $30.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-3 bg-navy text-ivory px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:bg-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Running analysis…" : "Run the analysis"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-ivory px-4 py-3 text-[0.98rem] font-mono text-ink focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink";

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-line pt-8">
      <p className="eyebrow text-ink-400">{eyebrow}</p>
      <legend className="sr-only">{title}</legend>
      <h2 className="mt-2 font-serif text-[1.6rem] leading-snug text-ink">
        {title}
      </h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  suffix,
  hint,
  required,
  children,
}: {
  label: string;
  suffix?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[0.85rem] font-medium text-ink">
          {label}
          {required && <span className="text-rust"> *</span>}
        </span>
        {suffix && (
          <span className="font-mono text-[0.72rem] uppercase tracking-ultra-wide text-ink-400">
            {suffix}
          </span>
        )}
      </span>
      {children}
      {hint && <span className="text-[0.78rem] text-ink-400">{hint}</span>}
    </label>
  );
}
