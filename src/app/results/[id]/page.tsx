import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  calculateDealMetrics,
  decodeAnalysisId,
  generateMethodologyResults,
  type MethodologyResult,
  type Verdict,
} from "@/lib/analyzer";
import Eyebrow from "@/components/ui/Eyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your deal analysis",
  description:
    "A teaser of the twenty-three methodologies. Unlock the full report for $30.",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { id: string };
}

export default function ResultsPage({ params }: PageProps) {
  const inputs = decodeAnalysisId(decodeURIComponent(params.id));
  if (!inputs) notFound();

  const metrics = calculateDealMetrics(inputs);
  const results = generateMethodologyResults(metrics, inputs);

  const composite = metrics.compositeScore;
  const teaserCount = 3;
  const lockedCount = Math.max(0, results.length - teaserCount);

  // Group results by category for display
  const byCategory = new Map<string, MethodologyResult[]>();
  results.forEach((r) => {
    const arr = byCategory.get(r.category) ?? [];
    arr.push(r);
    byCategory.set(r.category, arr);
  });

  return (
    <>
      {/* Header / Composite */}
      <section className="border-b border-line bg-ivory-200/40">
        <div className="container-editorial pt-20 pb-16 md:pt-24 md:pb-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>Preview report</Eyebrow>
            <h1 className="mt-5 font-serif text-display-lg text-ink">
              {composite.grade} grade.{" "}
              <span className="text-ink-400">
                {composite.score}/100 composite.
              </span>
            </h1>
            <p className="mt-6 text-[1.05rem] leading-[1.7] text-ink-500">
              {summarizeComposite(composite.verdict)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#unlock"
                className="inline-flex items-center gap-3 bg-navy text-ivory px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:bg-ink transition-colors"
              >
                Unlock the full report — $30
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-3 border border-ink-200 text-ink px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:border-ink hover:bg-ivory-200 transition-colors"
              >
                Analyze another deal
              </Link>
            </div>
          </div>

          <aside className="md:col-span-5 grid grid-cols-2 gap-px bg-line border border-line">
            <Stat
              label="Monthly cash flow"
              value={dollarPretty(metrics.monthlyCashFlow)}
            />
            <Stat
              label="Cash-on-cash"
              value={(metrics.cashOnCashReturn * 100).toFixed(2) + "%"}
            />
            <Stat
              label="Cap rate"
              value={(metrics.capRate * 100).toFixed(2) + "%"}
            />
            <Stat label="DSCR" value={metrics.dscr.toFixed(2)} />
          </aside>
        </div>
      </section>

      {/* Methodology cards */}
      <section className="border-b border-line">
        <div className="container-editorial py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>The methodologies</Eyebrow>
              <h2 className="mt-3 font-serif text-display-md text-ink">
                {results.length} verdicts. The first {teaserCount} are unlocked.
              </h2>
            </div>
            <p className="hidden md:block max-w-sm text-[0.92rem] leading-relaxed text-ink-400">
              Each methodology applies a different lens. The composite score
              reconciles them into one defensible answer.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {Array.from(byCategory.entries()).map(([category, items]) => (
              <div key={category}>
                <p className="eyebrow text-ink-400">{category}</p>
                <div className="mt-4 grid gap-px bg-line md:grid-cols-2">
                  {items.map((r) => {
                    const globalIndex = results.indexOf(r);
                    const locked = globalIndex >= teaserCount;
                    return (
                      <ResultCard key={r.id} result={r} locked={locked} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock CTA */}
      <section id="unlock" className="border-b border-line">
        <div className="container-editorial py-20 grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <Eyebrow>Unlock the full report</Eyebrow>
            <h2 className="mt-3 font-serif text-display-md text-ink">
              {lockedCount} more methodologies, four stress scenarios, and the
              full breakdown.
            </h2>
            <p className="mt-6 text-[1.02rem] leading-[1.7] text-ink-500">
              One payment. PDF emailed. No subscription. Active investors can
              bundle five reports for $24 each or twenty for $20 each.
            </p>
            <ul className="mt-8 space-y-3 text-[0.95rem] leading-relaxed text-ink-500 border-t border-line pt-6">
              <li>— Every methodology, fully unblurred, with the full explanation</li>
              <li>— Vacancy, rate, rent decline, and CapEx stress tests</li>
              <li>— Opportunity-cost benchmark vs S&amp;P, Treasuries, HYSA, REITs</li>
              <li>— Composite-score breakdown showing what pulled the grade up or down</li>
            </ul>
          </div>
          <aside className="md:col-span-5 border border-line bg-ivory-50 p-8">
            <p className="eyebrow text-ink-400">Single report</p>
            <p className="mt-4 font-serif text-[3rem] leading-none tracking-tight text-ink">
              $30
            </p>
            <p className="mt-2 text-[0.9rem] text-ink-400">
              Per report. PDF delivered.
            </p>
            <button
              type="button"
              disabled
              className="mt-6 w-full inline-flex items-center justify-center gap-3 bg-navy text-ivory px-5 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide opacity-60 cursor-not-allowed"
              title="Checkout coming soon"
            >
              Checkout coming soon
            </button>
            <p className="mt-3 text-[0.78rem] text-ink-400">
              Stripe checkout activates in the next deploy. Your inputs are
              encoded in this URL — bookmark it to come back.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function ResultCard({
  result,
  locked,
}: {
  result: MethodologyResult;
  locked: boolean;
}) {
  return (
    <article className="bg-ivory p-6 relative">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-[1.15rem] leading-snug text-ink">
          {result.name}
        </h3>
        <VerdictBadge verdict={result.verdict} />
      </div>
      <p className="mt-2 text-[0.85rem] text-ink-400 leading-relaxed">
        {result.description}
      </p>
      <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-line pt-4">
        <p
          className={`font-mono text-[0.95rem] text-ink ${
            locked ? "blur-sm select-none" : ""
          }`}
        >
          {result.value}
        </p>
        <p className="font-mono text-[0.72rem] uppercase tracking-ultra-wide text-ink-400">
          {result.threshold}
        </p>
      </div>
      <p
        className={`mt-3 text-[0.9rem] leading-relaxed text-ink-500 ${
          locked ? "blur-sm select-none" : ""
        }`}
      >
        {result.explanation}
      </p>
      {locked && (
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-line pt-4 bg-ivory">
          <span className="font-mono text-[0.72rem] uppercase tracking-ultra-wide text-ink-400">
            Locked
          </span>
          <Link
            href="#unlock"
            className="font-mono text-[0.72rem] uppercase tracking-ultra-wide text-navy hover:text-ink"
          >
            Unlock $30 →
          </Link>
        </div>
      )}
    </article>
  );
}

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const tone =
    verdict === "PASS" || verdict === "EXCELLENT" || verdict === "STRONG"
      ? "bg-sage-100 text-sage-500"
      : verdict === "MARGINAL" || verdict === "MODERATE"
      ? "bg-gold-100 text-gold-600"
      : "bg-rust-100 text-rust";
  return (
    <span
      className={`shrink-0 font-mono text-[0.65rem] uppercase tracking-ultra-wide px-2 py-1 ${tone}`}
    >
      {verdict}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ivory p-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-ultra-wide text-ink-400">
        {label}
      </p>
      <p className="mt-3 font-serif text-[1.6rem] leading-none tracking-tight text-ink">
        {value}
      </p>
    </div>
  );
}

function dollarPretty(n: number): string {
  const sign = n < 0 ? "-" : "";
  return sign + "$" + Math.abs(Math.round(n)).toLocaleString();
}

function summarizeComposite(verdict: Verdict): string {
  switch (verdict) {
    case "EXCELLENT":
      return "An institutional-grade deal. Methodology breakdown below shows where the strength comes from.";
    case "STRONG":
      return "A solid deal across the board. The full report shows the stress-scenario cushion.";
    case "MODERATE":
      return "The deal works but has tradeoffs. The full report shows which methodologies pulled the grade down.";
    case "WEAK":
      return "This deal carries meaningful risk. The full report identifies the specific weak points.";
    case "FAIL":
      return "We'd recommend walking or renegotiating. The full report shows exactly why.";
    default:
      return "See the methodology breakdown for the full picture.";
  }
}
