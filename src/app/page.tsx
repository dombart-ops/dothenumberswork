import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import Stat from "@/components/ui/Stat";
import MethodologyCard from "@/components/ui/MethodologyCard";
import { METHODOLOGIES, CATEGORIES } from "@/lib/methodologies";

export default function HomePage() {
  const featured = METHODOLOGIES.filter((m) =>
    [7, 8, 10, 12, 18, 22].includes(m.index)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-line">
        <div className="container-editorial pt-20 pb-24 md:pt-28 md:pb-32 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow>A Rusty Roof Media research tool</Eyebrow>
            <h1 className="mt-5 font-serif text-display-xl text-ink">
              Twenty-three ways to underwrite a deal.
              <span className="block text-ink-400">One report. One defensible answer.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-ink-500">
              Do The Numbers Work runs any single-family or small multifamily property
              through the same methodologies an institutional acquisitions desk uses
              to clear a deal. You input the property and financing. We return cap
              rate, cash-on-cash, DSCR, IRR, four stress scenarios, and a composite
              grade in a single PDF you can hand to a lender, a partner, or your
              future self.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                id="analyze"
                href="/analyze"
                className="inline-flex items-center gap-3 bg-navy text-ivory px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:bg-ink transition-colors"
              >
                Analyze a deal
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sample-report"
                className="inline-flex items-center gap-3 border border-ink-200 text-ink px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:border-ink hover:bg-ivory-200 transition-colors"
              >
                See a sample report
              </Link>
            </div>
            <p className="mt-6 text-[0.85rem] text-ink-400">
              $30 per analysis. No subscription. No upsell. Bundle pricing for active investors.
            </p>
          </div>

          <aside className="md:col-span-4 md:border-l md:border-line md:pl-10">
            <Eyebrow>What the report contains</Eyebrow>
            <ul className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-ink-500">
              <li className="flex gap-4">
                <span className="num text-ink-400 w-6 shrink-0 pt-0.5">01</span>
                <span>Cap rate, cash-on-cash, NOI, DSCR, total ROI, five-year IRR.</span>
              </li>
              <li className="flex gap-4">
                <span className="num text-ink-400 w-6 shrink-0 pt-0.5">02</span>
                <span>Four stress tests: vacancy, interest rate, rent decline, CapEx surprise.</span>
              </li>
              <li className="flex gap-4">
                <span className="num text-ink-400 w-6 shrink-0 pt-0.5">03</span>
                <span>Strategy-specific math for BRRRR, fix-and-flip, house hack, short-term rental.</span>
              </li>
              <li className="flex gap-4">
                <span className="num text-ink-400 w-6 shrink-0 pt-0.5">04</span>
                <span>Opportunity-cost benchmark against the S&amp;P, Treasuries, HYSA, and a REIT index.</span>
              </li>
              <li className="flex gap-4">
                <span className="num text-ink-400 w-6 shrink-0 pt-0.5">05</span>
                <span>A composite 0-100 grade with the metrics that pulled it up or down.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-line">
        <div className="container-editorial py-16 grid gap-10 md:gap-x-12 md:grid-cols-4">
          <Stat
            value="23"
            label="Underwriting methodologies executed per analysis"
            footnote="From the 1% rule to a five-year IRR solved by Newton-Raphson."
          />
          <Stat
            value="< 5 min"
            label="From listing URL to delivered report"
            footnote="Smart defaults pre-fill expense ratios you can override."
          />
          <Stat
            value="4"
            label="Stress scenarios run on every deal"
            footnote="Vacancy, rate, rent decline, CapEx catastrophe."
          />
          <Stat
            value="$30"
            label="Per analysis. Bundle pricing for portfolios."
            footnote="No subscription. No data resold. No upsell wall."
          />
        </div>
      </section>

      {/* The problem */}
      <section className="border-b border-line">
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="The problem"
              title="Most rental calculators answer the wrong question."
              lede="They tell you cash flow at one set of optimistic assumptions. They don't tell you what happens when the basement floods, the tenant breaks the lease, or the Fed moves another seventy-five basis points."
            />
          </div>
          <div className="md:col-span-7 grid gap-8 md:grid-cols-2">
            <Card title="Single-number outputs">
              A positive cash flow figure at 8% vacancy and 5% maintenance is not an
              answer. It is a starting point. Without a stress test, it is a guess
              dressed up as a number.
            </Card>
            <Card title="No methodology disclosed">
              Free calculators rarely state what is in the formula. We publish ours.
              You can read every assumption, every weighting, every default before
              you trust the output.
            </Card>
            <Card title="No comparison set">
              A 7% cash-on-cash return looks great until you remember a six-month
              Treasury yields nearly the same with no roof, no tenant, and no
              capital risk. We benchmark every deal explicitly.
            </Card>
            <Card title="Built for clicks, not capital">
              Most online calculators exist to capture a lead, sell a course, or
              point you at a referral mortgage broker. We sell one thing: the
              report.
            </Card>
          </div>
        </div>
      </section>

      {/* Featured methodologies */}
      <section className="border-b border-line">
        <div className="container-editorial py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeader
              eyebrow="Methodology"
              title="The math an institutional acquisitions desk uses."
              lede="Twenty-three methodologies organized into five categories, every formula and assumption disclosed. A representative sample below."
            />
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 font-mono uppercase text-[0.72rem] tracking-ultra-wide text-ink hover:text-navy"
            >
              All twenty-three methodologies <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((m) => (
              <MethodologyCard
                key={m.index}
                index={m.index}
                title={m.shortTitle ?? m.title}
                category={m.category}
                description={m.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories overview */}
      <section className="border-b border-line bg-ivory-200/40">
        <div className="container-editorial py-24">
          <SectionHeader
            eyebrow="Five lenses"
            title="No single number tells you whether a deal works."
            lede="We run the property through five distinct categories of analysis and reconcile the results into one composite grade."
          />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-5">
            {CATEGORIES.map((c, i) => (
              <div key={c.name} className="bg-ivory p-8">
                <span className="num text-[0.78rem] text-ink-400">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-[1.25rem] leading-snug text-ink">
                  {c.name}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-500">
                  {c.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-line">
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader
              eyebrow="How it works"
              title="From listing to report in under five minutes."
            />
          </div>
          <ol className="md:col-span-8 grid gap-px bg-line md:grid-cols-3">
            <Step
              index={1}
              title="Enter the property"
              body="Address, purchase price, units, rents, taxes, and insurance. We pre-fill industry-standard expense ratios you can override."
            />
            <Step
              index={2}
              title="Choose a strategy"
              body="Long-term rental, BRRRR, flip, house hack, or short-term rental. Each strategy unlocks the strategy-specific math."
            />
            <Step
              index={3}
              title="Receive the report"
              body="A delivered PDF with all twenty-three methodologies, four stress scenarios, the composite grade, and the underlying assumptions."
            />
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-line">
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="Pricing"
              title="Pay for the report. Nothing else."
              lede="Do The Numbers Work is a tool, not a subscription, not a course, not a lead-generation funnel. You pay per analysis."
            />
          </div>

          <div className="md:col-span-7 grid gap-6 md:grid-cols-3">
            <PriceTier
              eyebrow="Single"
              price="$30"
              unit="per report"
              features={[
                "One full deal analysis",
                "Twenty-three methodologies",
                "Four stress scenarios",
                "PDF report, emailed",
              ]}
            />
            <PriceTier
              eyebrow="Five-pack"
              price="$120"
              unit="$24 per report"
              features={[
                "Credits never expire",
                "Compare deals side by side",
                "Saved property history",
                "Suited to active acquisitions",
              ]}
              highlight
            />
            <PriceTier
              eyebrow="Twenty-pack"
              price="$400"
              unit="$20 per report"
              features={[
                "Designed for portfolio teams",
                "Email report templates",
                "Methodology export",
                "Priority support",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Closing trust block */}
      <section>
        <div className="container-editorial py-24 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-7">
            <SectionHeader
              eyebrow="Editorial standards"
              title="We publish our assumptions because the methodology is the product."
              lede="The composite score is the headline. The assumptions, weightings, and formulas behind it are the work. Both are documented and versioned."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card title="Author and editorial">
                Built and maintained by Rusty Roof Media. Every methodology is
                reviewed against published source material before it ships.
              </Card>
              <Card title="Versioned methodology">
                Every change to the underwriting model carries a date and a changelog.
                You can see exactly what your report was built on.
              </Card>
              <Card title="No data resale">
                Inputs you enter are stored only long enough to deliver your report
                and respond to support requests. We do not sell, share, or aggregate
                your deal data.
              </Card>
              <Card title="No paid placement">
                We do not accept fees from lenders, brokers, or property managers.
                There is nothing to disclose because there is nothing to disclose.
              </Card>
            </div>
          </div>

          <aside className="md:col-span-5 border border-line bg-ivory-50 p-8">
            <Eyebrow>Sample report</Eyebrow>
            <h3 className="mt-3 font-serif text-[1.6rem] leading-snug text-ink">
              See exactly what you get for thirty dollars.
            </h3>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-500">
              A real worked example, every methodology populated, every stress test
              shown. No login, no credit card.
            </p>
            <Link
              href="/sample-report"
              className="mt-6 inline-flex items-center gap-3 bg-navy text-ivory px-5 py-3 font-mono uppercase text-[0.74rem] tracking-ultra-wide hover:bg-ink"
            >
              View sample report <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <h3 className="font-serif text-[1.2rem] leading-snug text-ink">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{children}</p>
    </div>
  );
}

function Step({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <li className="bg-ivory p-8">
      <span className="num text-[0.78rem] text-ink-400">
        Step {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-serif text-[1.3rem] leading-snug text-ink">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{body}</p>
    </li>
  );
}

function PriceTier({
  eyebrow,
  price,
  unit,
  features,
  highlight,
}: {
  eyebrow: string;
  price: string;
  unit: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col p-6 border ${
        highlight ? "border-ink bg-ink text-ivory" : "border-line bg-ivory-50"
      }`}
    >
      <p
        className={`eyebrow ${
          highlight ? "text-gold-200" : "text-ink-400"
        }`}
      >
        {eyebrow}
      </p>
      <p className="mt-4 font-serif text-[2.5rem] leading-none tracking-tight">
        {price}
      </p>
      <p
        className={`mt-1 text-[0.85rem] ${
          highlight ? "text-ivory/70" : "text-ink-400"
        }`}
      >
        {unit}
      </p>
      <ul
        className={`mt-6 space-y-2.5 text-[0.92rem] leading-relaxed ${
          highlight ? "text-ivory/85" : "text-ink-500"
        }`}
      >
        {features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span aria-hidden className={highlight ? "text-gold-200" : "text-gold"}>
              —
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
