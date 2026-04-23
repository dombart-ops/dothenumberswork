import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import { METHODOLOGIES, CATEGORIES, MethodologyCategory } from "@/lib/methodologies";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Every formula, every threshold, every assumption Do The Numbers Work uses to underwrite a real estate deal. All twenty-three methodologies disclosed.",
  alternates: { canonical: "https://dothenumberswork.com/methodology" },
};

export default function MethodologyPage() {
  const grouped: Record<MethodologyCategory, typeof METHODOLOGIES> = {
    "Rules of thumb": [],
    "Investor metrics": [],
    "Strategy": [],
    "Stress testing": [],
    "Comparative": [],
  };
  METHODOLOGIES.forEach((m) => grouped[m.category].push(m));

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What underwriting methodologies does Do The Numbers Work use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Twenty-three methodologies organized in five categories: rules of thumb, investor metrics, strategy-specific math, stress testing, and comparative benchmarks.",
        },
      },
      {
        "@type": "Question",
        name: "How is the composite score calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A weighted blend of cash-on-cash return, cap rate, DSCR, $100-per-door, the 1% rule, break-even ratio, IRR, and stress-test resilience, normalized to a 0-100 scale.",
        },
      },
      {
        "@type": "Question",
        name: "Is the methodology versioned?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every published report includes a methodology version stamp, and the changelog is publicly maintained.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />

      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-16">
          <Eyebrow>Methodology — version DTNW-2026.04.1</Eyebrow>
          <h1 className="mt-5 font-serif text-display-xl text-ink max-w-4xl">
            Every formula. Every threshold. Every assumption.
          </h1>
          <p className="mt-8 max-w-2xl text-[1.075rem] leading-[1.7] text-ink-500">
            The output is only as credible as the math behind it. We publish all
            twenty-three methodologies, the formula each one uses, and the threshold
            we judge it against. Read it cover to cover, or jump to the metric your
            lender cares about.
          </p>
        </div>
      </header>

      {/* Table of contents */}
      <section className="border-b border-line bg-ivory-200/40">
        <div className="container-editorial py-12 grid gap-8 md:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <a
              key={c.name}
              href={`#${slug(c.name)}`}
              className="block group"
            >
              <span className="num text-[0.78rem] text-ink-400">
                0{i + 1}
              </span>
              <p className="mt-2 font-serif text-[1.1rem] text-ink group-hover:text-navy">
                {c.name}
              </p>
              <p className="mt-1 text-[0.85rem] text-ink-400">
                {grouped[c.name].length} methodologies
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      {CATEGORIES.map((cat) => (
        <section key={cat.name} id={slug(cat.name)} className="border-b border-line scroll-mt-24">
          <div className="container-editorial py-20">
            <SectionHeader eyebrow={`Category — ${cat.name}`} title={cat.name} lede={cat.blurb} />
            <div className="mt-12 divide-y divide-line border-t border-line">
              {grouped[cat.name].map((m) => (
                <article key={m.index} className="grid gap-8 md:grid-cols-12 py-8">
                  <header className="md:col-span-3">
                    <span className="num text-[0.78rem] text-ink-400">
                      {String(m.index).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-serif text-[1.4rem] leading-snug text-ink">
                      {m.title}
                    </h3>
                    {m.shortTitle ? (
                      <p className="mt-1 font-mono text-[0.78rem] uppercase tracking-wider text-ink-400">
                        {m.shortTitle}
                      </p>
                    ) : null}
                  </header>
                  <div className="md:col-span-9 space-y-4">
                    <p className="text-[1rem] leading-[1.7] text-ink-500 max-w-prose">
                      {m.description}
                    </p>
                    {m.formula ? (
                      <div className="font-mono text-[0.92rem] text-ink bg-ivory-50 border border-line px-4 py-3 inline-block">
                        {m.formula}
                      </div>
                    ) : null}
                    {m.whenToUse ? (
                      <p className="text-[0.92rem] text-ink-400">
                        <span className="font-mono uppercase text-[0.7rem] tracking-wider mr-2">
                          When to use
                        </span>
                        {m.whenToUse}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Composite weighting */}
      <section className="border-b border-line bg-ivory-200/40">
        <div className="container-editorial py-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="Composite score"
              title="How twenty-three numbers become one grade."
              lede="No single metric is decisive. We weight the eight load-bearing ones, normalize to a 0-100 scale, and translate to a letter grade."
            />
          </div>
          <div className="md:col-span-7">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th className="text-right">Weight</th>
                </tr>
              </thead>
              <tbody className="num">
                <tr><td>Cash-on-cash return</td><td className="text-right">20%</td></tr>
                <tr><td>Cap rate</td><td className="text-right">15%</td></tr>
                <tr><td>DSCR</td><td className="text-right">15%</td></tr>
                <tr><td>$100 per door</td><td className="text-right">10%</td></tr>
                <tr><td>1% rule</td><td className="text-right">10%</td></tr>
                <tr><td>Break-even ratio</td><td className="text-right">10%</td></tr>
                <tr><td>Five-year IRR</td><td className="text-right">10%</td></tr>
                <tr><td>Stress-test resilience</td><td className="text-right">10%</td></tr>
                <tr className="border-t-2 border-line">
                  <td className="font-medium">Total</td>
                  <td className="text-right font-medium">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-editorial py-20 text-center">
          <Eyebrow as="h2">Run the methodology on a real deal</Eyebrow>
          <p className="mt-4 font-serif text-display-md text-ink max-w-3xl mx-auto">
            Now that you know what is in the model, see what comes out of it.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/sample-report"
              className="inline-flex items-center gap-3 bg-navy text-ivory px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:bg-ink"
            >
              See a sample report <span aria-hidden>→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-3 border border-ink-200 px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:border-ink hover:bg-ivory-200"
            >
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
