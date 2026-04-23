import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Sample report",
  description:
    "A representative Do The Numbers Work analysis. Twenty-three methodologies, four stress scenarios, one composite grade, all populated.",
  alternates: { canonical: "https://dothenumberswork.com/sample-report" },
};

export default function SampleReportPage() {
  return (
    <article className="bg-ivory">
      {/* Cover sheet */}
      <header className="border-b border-line">
        <div className="container-editorial pt-16 pb-12">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <Eyebrow>Sample report — illustrative only</Eyebrow>
              <h1 className="mt-4 font-serif text-display-lg text-ink">
                4218 Maple Ridge Drive
                <span className="block text-ink-400 text-display-md mt-1">
                  Indianapolis, IN 46220
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-ink-500">
                A representative midwest single-family long-term rental, modeled on
                conventional 30-year financing with 25% down. Numbers below are
                computed from the inputs disclosed at the bottom of this report.
              </p>
            </div>
            <aside className="md:col-span-4 md:border-l md:border-line md:pl-10 space-y-5">
              <KV label="Strategy" value="Long-term rental" />
              <KV label="Purchase price" value="$245,000" />
              <KV label="All-in basis" value="$252,350" />
              <KV label="Report version" value="DTNW-2026.04.1" />
              <KV label="Generated" value="2026-04-22" />
            </aside>
          </div>
        </div>
      </header>

      {/* Composite verdict */}
      <section className="border-b border-line bg-ink text-ivory">
        <div className="container-editorial py-16 grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <Eyebrow className="text-gold-200">Composite verdict</Eyebrow>
            <p className="mt-4 font-serif text-display-lg leading-none">
              <span className="num text-gold-200">B+</span>
              <span className="text-ivory/70 num text-[2.25rem] ml-4">
                78
              </span>
              <span className="text-ivory/40 text-[1.6rem] ml-2">/ 100</span>
            </p>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-ivory/80">
              A defensible long-term rental with healthy debt coverage and
              comfortable stress-test resilience. The deal clears every lender
              threshold but trails the top quartile on cash-on-cash. We would
              proceed; we would also push on price.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-x-6 gap-y-5">
            <Pulled label="Pulled it up" items={["DSCR 1.42", "Stress resilience", "Cap rate 7.1%"]} sign="+" />
            <Pulled label="Pulled it down" items={["CoC 6.4%", "1% rule fail", "GRM 11.6"]} sign="−" />
          </div>
        </div>
      </section>

      {/* Section 1 — Cash flow snapshot */}
      <Section number="01" title="Cash flow snapshot">
        <table className="data-table">
          <thead>
            <tr>
              <th>Line item</th>
              <th className="text-right">Monthly</th>
              <th className="text-right">Annual</th>
            </tr>
          </thead>
          <tbody className="num">
            <tr><td>Gross rent</td><td className="text-right">$1,950</td><td className="text-right">$23,400</td></tr>
            <tr><td>Vacancy reserve (8%)</td><td className="text-right text-rust">($156)</td><td className="text-right text-rust">($1,872)</td></tr>
            <tr><td>Property management (10%)</td><td className="text-right text-rust">($179)</td><td className="text-right text-rust">($2,153)</td></tr>
            <tr><td>Maintenance (5%)</td><td className="text-right text-rust">($90)</td><td className="text-right text-rust">($1,076)</td></tr>
            <tr><td>CapEx reserve (5%)</td><td className="text-right text-rust">($90)</td><td className="text-right text-rust">($1,076)</td></tr>
            <tr><td>Property tax</td><td className="text-right text-rust">($212)</td><td className="text-right text-rust">($2,540)</td></tr>
            <tr><td>Insurance</td><td className="text-right text-rust">($95)</td><td className="text-right text-rust">($1,140)</td></tr>
            <tr className="border-t-2 border-line"><td className="font-medium">Net Operating Income</td><td className="text-right font-medium">$1,128</td><td className="text-right font-medium">$13,543</td></tr>
            <tr><td>Debt service (P&amp;I)</td><td className="text-right text-rust">($793)</td><td className="text-right text-rust">($9,514)</td></tr>
            <tr className="border-t border-line bg-ivory-200/40"><td className="font-medium">Cash flow</td><td className="text-right font-medium text-sage-500">$335</td><td className="text-right font-medium text-sage-500">$4,029</td></tr>
          </tbody>
        </table>
      </Section>

      {/* Section 2 — Investor metrics */}
      <Section number="02" title="Investor metrics">
        <div className="grid gap-px bg-line md:grid-cols-3">
          <Metric label="Cap rate" value="7.10%" detail="NOI $13,543 ÷ price $245,000" verdict="Above market" verdictTone="good" />
          <Metric label="Cash-on-cash return" value="6.41%" detail="$4,029 ÷ $62,850 cash invested" verdict="Below top quartile" verdictTone="warn" />
          <Metric label="DSCR" value="1.42" detail="NOI ÷ debt service. Lender comfort ≥ 1.20" verdict="Lender-ready" verdictTone="good" />
          <Metric label="Five-year IRR" value="14.8%" detail="Includes modeled exit at 3% appreciation" verdict="Healthy" verdictTone="good" />
          <Metric label="Total ROI (Year 1)" value="11.9%" detail="Cash + principal + appreciation" verdict="Strong" verdictTone="good" />
          <Metric label="Break-even ratio" value="79%" detail="OpEx + debt ÷ gross rent. Comfort < 85%" verdict="Comfortable" verdictTone="good" />
        </div>
      </Section>

      {/* Section 3 — Rules of thumb */}
      <Section number="03" title="Rules of thumb">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rule</th>
              <th className="text-right">Result</th>
              <th className="text-right">Threshold</th>
              <th className="text-right">Verdict</th>
            </tr>
          </thead>
          <tbody className="num">
            <tr><td>1% rule</td><td className="text-right">0.80%</td><td className="text-right">≥ 1.00%</td><td className="text-right text-rust">Fail</td></tr>
            <tr><td>2% rule</td><td className="text-right">0.80%</td><td className="text-right">≥ 2.00%</td><td className="text-right text-rust">Fail</td></tr>
            <tr><td>50% rule (estimated OpEx)</td><td className="text-right">42%</td><td className="text-right">≤ 50%</td><td className="text-right text-sage-500">Pass</td></tr>
            <tr><td>$100/door</td><td className="text-right">$335</td><td className="text-right">≥ $100</td><td className="text-right text-sage-500">Pass</td></tr>
            <tr><td>Gross Rent Multiplier</td><td className="text-right">10.5</td><td className="text-right">≤ 12 (typical)</td><td className="text-right text-sage-500">Pass</td></tr>
          </tbody>
        </table>
        <p className="mt-4 text-[0.85rem] text-ink-400">
          The 1% and 2% rules are inherited from a different rate environment. The deal&apos;s failure on
          both is not disqualifying given DSCR and IRR strength; it is information about pricing.
        </p>
      </Section>

      {/* Section 4 — Stress tests */}
      <Section number="04" title="Stress tests">
        <div className="grid gap-px bg-line md:grid-cols-2">
          <StressBlock title="Vacancy stress" rows={[
            { scenario: "Base (8%)", outcome: "+$335 / mo", tone: "good" },
            { scenario: "Stress (15%)", outcome: "+$200 / mo", tone: "good" },
            { scenario: "Severe (20%)", outcome: "+$103 / mo", tone: "warn" },
            { scenario: "Crisis (25%)", outcome: "+$5 / mo", tone: "warn" },
          ]} />
          <StressBlock title="Interest rate stress" rows={[
            { scenario: "Base (7.25%)", outcome: "+$335 / mo", tone: "good" },
            { scenario: "+100 bps", outcome: "+$210 / mo", tone: "good" },
            { scenario: "+200 bps", outcome: "+$82 / mo", tone: "warn" },
            { scenario: "+300 bps", outcome: "−$48 / mo", tone: "bad" },
          ]} />
          <StressBlock title="Rent decline stress" rows={[
            { scenario: "Base", outcome: "+$335 / mo", tone: "good" },
            { scenario: "−5%", outcome: "+$237 / mo", tone: "good" },
            { scenario: "−10%", outcome: "+$140 / mo", tone: "good" },
            { scenario: "−15%", outcome: "+$42 / mo", tone: "warn" },
          ]} />
          <StressBlock title="CapEx catastrophe (Year 1)" rows={[
            { scenario: "Base", outcome: "+$4,029 yr", tone: "good" },
            { scenario: "$10K event", outcome: "−$5,971 yr", tone: "bad" },
            { scenario: "$25K event", outcome: "−$20,971 yr", tone: "bad" },
            { scenario: "$50K event", outcome: "−$45,971 yr", tone: "bad" },
          ]} />
        </div>
        <p className="mt-6 text-[0.9rem] leading-relaxed text-ink-500 max-w-prose">
          The deal stays cash-flow positive through a doubling of vacancy, a 15% rent
          decline, and a 200 bps rate move. It does not survive a single major
          uninsured CapEx event in year one. Reserve recommendation: $12,000 minimum.
        </p>
      </Section>

      {/* Section 5 — Opportunity cost */}
      <Section number="05" title="Opportunity cost benchmark">
        <table className="data-table">
          <thead>
            <tr>
              <th>Where else $62,850 of cash could go</th>
              <th className="text-right">5-yr expected total return</th>
              <th className="text-right">Liquidity</th>
              <th className="text-right">Effort</th>
            </tr>
          </thead>
          <tbody className="num">
            <tr><td>This deal</td><td className="text-right">~ 14.8% IRR</td><td className="text-right">Low</td><td className="text-right">High</td></tr>
            <tr><td>S&amp;P 500 index</td><td className="text-right">~ 9% historical</td><td className="text-right">High</td><td className="text-right">None</td></tr>
            <tr><td>Vanguard REIT (VNQ)</td><td className="text-right">~ 8%</td><td className="text-right">High</td><td className="text-right">None</td></tr>
            <tr><td>10-yr Treasury</td><td className="text-right">~ 4.3%</td><td className="text-right">Medium</td><td className="text-right">None</td></tr>
            <tr><td>High-yield savings</td><td className="text-right">~ 4.5%</td><td className="text-right">High</td><td className="text-right">None</td></tr>
          </tbody>
        </table>
        <p className="mt-4 text-[0.85rem] text-ink-400">
          The deal&apos;s premium over passive alternatives compensates for illiquidity, single-asset
          concentration, and operational effort. Whether that premium is sufficient is a judgment call.
        </p>
      </Section>

      {/* Section 6 — Inputs disclosed */}
      <Section number="06" title="Inputs and assumptions disclosed">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Property and financing</Eyebrow>
            <dl className="mt-4 grid grid-cols-2 gap-y-2.5 text-[0.92rem]">
              <Term>Purchase price</Term><Def>$245,000</Def>
              <Term>Closing costs</Term><Def>$7,350 (3%)</Def>
              <Term>Down payment</Term><Def>$61,250 (25%)</Def>
              <Term>Loan amount</Term><Def>$183,750</Def>
              <Term>Interest rate</Term><Def>7.25%</Def>
              <Term>Loan term</Term><Def>30 years</Def>
              <Term>Property tax</Term><Def>$2,540 / yr</Def>
              <Term>Insurance</Term><Def>$1,140 / yr</Def>
            </dl>
          </div>
          <div>
            <Eyebrow>Operating assumptions</Eyebrow>
            <dl className="mt-4 grid grid-cols-2 gap-y-2.5 text-[0.92rem]">
              <Term>Gross monthly rent</Term><Def>$1,950</Def>
              <Term>Vacancy</Term><Def>8%</Def>
              <Term>Property management</Term><Def>10%</Def>
              <Term>Maintenance</Term><Def>5%</Def>
              <Term>CapEx reserve</Term><Def>5%</Def>
              <Term>Appreciation (modeled)</Term><Def>3% / yr</Def>
              <Term>Rent growth (modeled)</Term><Def>3% / yr</Def>
              <Term>Holding period</Term><Def>5 years</Def>
            </dl>
          </div>
        </div>
      </Section>

      {/* Disclaimer + CTA */}
      <section className="bg-ivory-200/50 border-t border-line">
        <div className="container-editorial py-16 grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <Eyebrow>Disclosure</Eyebrow>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500 max-w-prose">
              This sample report uses synthetic inputs constructed to demonstrate the
              full output. It is not a recommendation to buy any property. Any real
              report you generate uses inputs you provide, and the methodology version
              is stamped on the cover sheet so you can reproduce or audit the output.
            </p>
          </div>
          <aside className="md:col-span-5 md:text-right">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-3 bg-navy text-ivory px-5 py-3 font-mono uppercase text-[0.74rem] tracking-ultra-wide hover:bg-ink"
            >
              Read the full methodology <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-editorial py-16 grid gap-10 md:grid-cols-12">
        <header className="md:col-span-3">
          <span className="num text-[0.78rem] text-ink-400">{number}</span>
          <h2 className="mt-2 font-serif text-[1.6rem] leading-snug text-ink">
            {title}
          </h2>
        </header>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-line/70 pb-3 text-[0.92rem]">
      <dt className="text-ink-400">{label}</dt>
      <dd className="num text-ink">{value}</dd>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  verdict,
  verdictTone,
}: {
  label: string;
  value: string;
  detail: string;
  verdict: string;
  verdictTone: "good" | "warn" | "bad";
}) {
  const toneClass =
    verdictTone === "good"
      ? "text-sage-500"
      : verdictTone === "warn"
      ? "text-gold"
      : "text-rust";
  return (
    <div className="bg-ivory p-6">
      <p className="eyebrow">{label}</p>
      <p className="num mt-3 text-[2rem] leading-none tracking-tight text-ink">{value}</p>
      <p className="mt-2 text-[0.85rem] text-ink-400">{detail}</p>
      <p className={`mt-3 text-[0.85rem] font-mono uppercase tracking-wider ${toneClass}`}>
        {verdict}
      </p>
    </div>
  );
}

function StressBlock({
  title,
  rows,
}: {
  title: string;
  rows: { scenario: string; outcome: string; tone: "good" | "warn" | "bad" }[];
}) {
  return (
    <div className="bg-ivory p-6">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.92rem] num">
        {rows.map((r) => {
          const tone =
            r.tone === "good" ? "text-sage-500" : r.tone === "warn" ? "text-gold" : "text-rust";
          return (
            <li key={r.scenario} className="flex justify-between gap-4 border-b border-line/60 pb-2 last:border-b-0">
              <span className="text-ink-500">{r.scenario}</span>
              <span className={tone}>{r.outcome}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Pulled({
  label,
  items,
  sign,
}: {
  label: string;
  items: string[];
  sign: "+" | "−";
}) {
  return (
    <div>
      <p className="eyebrow text-ivory/50">{label}</p>
      <ul className="mt-3 space-y-2 text-[0.95rem] num">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-ivory/80">
            <span className="text-gold-200">{sign}</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return <dt className="text-ink-400">{children}</dt>;
}

function Def({ children }: { children: React.ReactNode }) {
  return <dd className="num text-ink text-right">{children}</dd>;
}
