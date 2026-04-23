import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Disclosures",
  description:
    "Editorial independence, conflicts of interest, methodology limitations, and the things we want every reader to know.",
  alternates: { canonical: "https://dothenumberswork.com/disclosures" },
};

export default function DisclosuresPage() {
  return (
    <article>
      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-12">
          <Eyebrow>Disclosures</Eyebrow>
          <h1 className="mt-5 font-serif text-display-lg text-ink max-w-3xl">
            Disclosures.
          </h1>
          <p className="mt-6 text-[0.92rem] text-ink-400">
            Last updated 22 April 2026.
          </p>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-prose py-16 space-y-10 text-[1.05rem] leading-[1.75] text-ink-500">
          <Block heading="01 — Editorial independence">
            We do not accept paid placement from lenders, brokers, syndicators,
            property managers, or any party that benefits from a real estate
            transaction you might undertake. We do not collect referral fees.
            The Service has no affiliate links.
          </Block>

          <Block heading="02 — Author financial interests">
            Dom Bart, the author of the methodology, owns rental real estate in
            the United States. The methodology is identical regardless of
            whether the property analyzed resembles his own holdings. The
            Service does not surface, recommend, or link to any specific
            property listings.
          </Block>

          <Block heading="03 — What the Service is">
            The Service is a software analytics tool. It applies disclosed
            underwriting methodologies to user-provided inputs. The output is
            a structured report. The Service is not a registered investment
            advisor and does not provide personalized investment advice.
          </Block>

          <Block heading="04 — Methodology limitations">
            <ul className="list-none pl-0 space-y-3">
              <li><strong className="text-ink">Garbage in, garbage out.</strong> Outputs depend entirely on the accuracy of your inputs. A wrong rent assumption produces a wrong report.</li>
              <li><strong className="text-ink">Modeled futures are guesses.</strong> Five-year IRR and total ROI rely on appreciation and rent-growth assumptions you choose. We do not predict the future.</li>
              <li><strong className="text-ink">Local context matters.</strong> Our model does not know your local property tax appeal track record, your specific tenant pool, your area&apos;s rent control posture, or your insurance market.</li>
              <li><strong className="text-ink">Tax treatment is generic.</strong> Reports do not include depreciation, 1031 treatment, or your individual tax bracket.</li>
            </ul>
          </Block>

          <Block heading="05 — Data sources">
            All numerical inputs come from you. Default expense ratios (vacancy,
            management, maintenance, CapEx) are derived from publicly available
            industry surveys and our own operating experience. Default
            assumptions are surfaced in every report and can be overridden.
          </Block>

          <Block heading="06 — Versioning">
            Every report carries a methodology version stamp (e.g.{" "}
            <span className="font-mono text-ink">DTNW-2026.04.1</span>). The
            changelog of methodology revisions is published on the {" "}
            <a className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink" href="/methodology">methodology</a>
            {" "}page.
          </Block>

          <Block heading="07 — Affiliations">
            Do The Numbers Work is published by Rusty Roof Media, an
            independent media studio based in Ann Arbor, Michigan. Rusty Roof
            Media is not affiliated with any real estate brokerage, lender, or
            property management firm.
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
