import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms governing your use of Do The Numbers Work and the reports we deliver.",
  alternates: { canonical: "https://dothenumberswork.com/terms" },
};

export default function TermsPage() {
  return (
    <article>
      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-12">
          <Eyebrow>Terms of use</Eyebrow>
          <h1 className="mt-5 font-serif text-display-lg text-ink max-w-3xl">
            Terms of use.
          </h1>
          <p className="mt-6 text-[0.92rem] text-ink-400">
            Last updated 22 April 2026.
          </p>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-prose py-16 space-y-10 text-[1.05rem] leading-[1.75] text-ink-500">
          <Block heading="01 — Agreement">
            By using Do The Numbers Work (the &ldquo;Service&rdquo;) you agree to these
            terms. If you do not agree, do not use the Service. The Service is
            published by Rusty Roof Media (the &ldquo;Publisher&rdquo;).
          </Block>

          <Block heading="02 — What the Service is, and is not">
            The Service is a software analytics tool that applies disclosed
            underwriting methodologies to inputs you provide and returns a
            structured report. The Service is not investment advice. It is not
            tax, accounting, legal, or fiduciary advice. It does not constitute
            an offer or recommendation to buy, sell, or hold any security or real
            property. Outputs are model estimates that depend entirely on the
            accuracy of your inputs.
          </Block>

          <Block heading="03 — Your responsibilities">
            You are responsible for the accuracy of every input you enter. You
            are responsible for verifying any output against your own
            independent due diligence. You are solely responsible for any
            transaction you undertake based on, or partially based on, a report
            you generate.
          </Block>

          <Block heading="04 — Payment, refunds, and reports">
            Reports are sold on a per-report basis, with multi-report bundles
            available. Payment is processed by Stripe. Once a report has been
            generated and delivered, it is final and non-refundable. If a
            technical failure prevents delivery of a report you paid for, we will
            either redeliver or refund. Bundles never expire.
          </Block>

          <Block heading="05 — Intellectual property">
            The methodology, software, design, and brand of Do The Numbers Work
            are owned by Rusty Roof Media. Reports you purchase are licensed for
            your internal use and the use of your immediate decision-making
            team (partners, lenders, advisors). You may not republish, resell,
            or repackage reports as a derivative product.
          </Block>

          <Block heading="06 — Acceptable use">
            You may not use the Service to violate any law, infringe any right,
            or attempt to reverse engineer our methodology. You may not scrape,
            automate, or systematically extract reports outside the intended
            user interface. You may not use the Service to harass, defraud, or
            mislead any party.
          </Block>

          <Block heading="07 — Warranties and disclaimer">
            The Service is provided &ldquo;as is&rdquo; without warranty of any kind, express
            or implied. We do not warrant that any output will be accurate,
            complete, or fit for any particular purpose. Real estate investment
            involves substantial risk including the possible loss of principal.
          </Block>

          <Block heading="08 — Limitation of liability">
            To the maximum extent permitted by law, the Publisher&apos;s total
            liability arising out of or relating to the Service is limited to
            the amount you paid the Publisher in the twelve months preceding the
            claim. The Publisher is not liable for indirect, incidental,
            consequential, or punitive damages.
          </Block>

          <Block heading="09 — Governing law">
            These terms are governed by the laws of the State of Michigan,
            United States, without regard to conflict-of-laws principles. Any
            dispute will be resolved in the state or federal courts located in
            Washtenaw County, Michigan.
          </Block>

          <Block heading="10 — Changes">
            We may update these terms from time to time. The &ldquo;last updated&rdquo;
            date reflects the most recent revision. Continued use of the Service
            after changes constitutes acceptance.
          </Block>

          <Block heading="11 — Contact">
            Questions about these terms can be sent to {" "}
            <a className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink" href="mailto:legal@dothenumberswork.com">
              legal@dothenumberswork.com
            </a>
            .
          </Block>
        </div>
      </section>
    </article>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono uppercase text-[0.78rem] tracking-ultra-wide text-ink-400">
        {heading}
      </h2>
      <div className="mt-3 text-ink-500 max-w-prose">{children}</div>
    </section>
  );
}
