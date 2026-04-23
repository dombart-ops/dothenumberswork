import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "About",
  description:
    "Do The Numbers Work is a Rusty Roof Media research tool. Our editorial standards, our author, and the principles behind the math.",
  alternates: { canonical: "https://dothenumberswork.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-16">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-5 font-serif text-display-xl text-ink max-w-4xl">
            We built the tool we wanted to use.
          </h1>
          <p className="mt-8 max-w-2xl text-[1.075rem] leading-[1.7] text-ink-500">
            Most rental calculators are lead magnets. They exist to capture an email
            address, sell a course, or refer you to a mortgage broker. Do The
            Numbers Work is different. It is a paid tool, $30 per analysis, and
            that is the entire business model. We are not capturing your data. We
            are not selling your inputs. We are selling a report.
          </p>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-editorial py-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Publisher</Eyebrow>
            <h2 className="mt-3 font-serif text-display-md text-ink">
              A Rusty Roof Media research tool.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-[1.05rem] leading-[1.75] text-ink-500 max-w-prose">
            <p>
              Rusty Roof Media is a Michigan-based studio that builds practical
              software and editorial properties for people making real-world
              decisions. We publish a portfolio of analytics tools that share one
              commitment: surface the numbers, disclose the math, sell the report.
            </p>
            <p>
              Do The Numbers Work is the deal-level analyzer in that portfolio.
              <Link href="https://howsthemarketdoing.com" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink"> How&apos;s The Market Doing </Link>
              tracks the macro context that prices a deal. {" "}
              <Link href="https://localequityreport.com" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">Local Equity Report </Link>
              translates a metro into a specific equity opportunity. {" "}
              <Link href="https://personalequityreport.com" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">Personal Equity Report </Link>
              ties an investor&apos;s portfolio together. Each tool stands alone; the
              portfolio compounds.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ivory-200/40">
        <div className="container-editorial py-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Editorial standards</Eyebrow>
            <h2 className="mt-3 font-serif text-display-md text-ink">
              Disclosed math, versioned reports.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-[1.05rem] leading-[1.75] text-ink-500 max-w-prose">
            <p>
              Every report carries a methodology version stamp. Every formula and
              threshold is published in our <Link href="/methodology" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">methodology</Link> document.
              When the model changes, the changelog records what changed and why.
            </p>
            <p>
              We do not accept paid placement from lenders, brokers, property
              managers, syndicators, or any party that benefits from a transaction
              you might make based on our output. We are not affiliated with any
              real estate brokerage. We do not collect referral fees.
            </p>
            <p>
              Outputs are model estimates. Real estate involves substantial risk.
              Nothing on this site is investment, tax, or legal advice. Consult a
              licensed professional before transacting. The full disclosure is on
              our <Link href="/disclosures" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">disclosures</Link> page.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-editorial py-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Author</Eyebrow>
            <h2 className="mt-3 font-serif text-display-md text-ink">
              Built and maintained by Dom Bart.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-[1.05rem] leading-[1.75] text-ink-500 max-w-prose">
            <p>
              Dom Bart is the founder of Rusty Roof Media and the author of the
              underwriting methodology used in every Do The Numbers Work report.
              He has spent the last decade building practical software and operating
              small businesses in Ann Arbor, Michigan.
            </p>
            <p>
              Methodology questions, corrections, and editorial feedback are
              welcomed at {" "}
              <a href="mailto:editorial@dothenumberswork.com" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">
                editorial@dothenumberswork.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-editorial py-20 text-center">
          <Eyebrow as="h2">Ready to see it work?</Eyebrow>
          <p className="mt-4 font-serif text-display-md text-ink max-w-3xl mx-auto">
            Run the methodology on a real deal.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/sample-report"
              className="inline-flex items-center gap-3 bg-navy text-ivory px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:bg-ink"
            >
              See a sample report <span aria-hidden>→</span>
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-3 border border-ink-200 px-6 py-3.5 font-mono uppercase text-[0.78rem] tracking-ultra-wide hover:border-ink hover:bg-ivory-200"
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
