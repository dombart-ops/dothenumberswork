import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Do The Numbers Work collects, uses, and stores the information you provide.",
  alternates: { canonical: "https://dothenumberswork.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <article>
      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-12">
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="mt-5 font-serif text-display-lg text-ink max-w-3xl">
            Privacy policy.
          </h1>
          <p className="mt-6 text-[0.92rem] text-ink-400">
            Last updated 22 April 2026.
          </p>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-prose py-16 space-y-10 text-[1.05rem] leading-[1.75] text-ink-500">
          <Block heading="01 — Summary in one paragraph">
            We collect the property and financial inputs you enter to generate your
            report, your email address to deliver it, and your payment information
            via Stripe. We do not sell, share, or aggregate your deal data. We
            retain inputs for ninety days for support and audit purposes, then
            delete them. Full detail follows.
          </Block>

          <Block heading="02 — What we collect">
            <ul className="list-none pl-0 space-y-3">
              <li><strong className="text-ink">Deal inputs.</strong> Property address, purchase price, financing terms, rent, expense assumptions, and strategy selection.</li>
              <li><strong className="text-ink">Account data.</strong> Email address, optional name, and a hashed authentication token if you create an account.</li>
              <li><strong className="text-ink">Payment data.</strong> Processed by Stripe. We receive a payment confirmation and the last four digits of the card. We do not see or store full card numbers.</li>
              <li><strong className="text-ink">Technical data.</strong> Standard server logs (IP address, user agent, timestamp) retained for thirty days for security and abuse prevention.</li>
            </ul>
          </Block>

          <Block heading="03 — How we use it">
            We use your inputs to generate the report you paid for. We use your
            email address to deliver the report, to respond to support requests,
            and, only if you opt in, to send occasional product updates. We use
            payment data to fulfill the transaction and meet our tax-reporting
            obligations.
          </Block>

          <Block heading="04 — What we do not do">
            We do not sell your data to third parties. We do not aggregate your
            inputs into market data sets. We do not use your inputs to train
            outside models. We do not share your email address with brokers,
            lenders, or affiliate partners.
          </Block>

          <Block heading="05 — Retention">
            Deal inputs and the resulting report are retained for ninety days from
            the date of generation. Account email and a record of paid invoices
            are retained for seven years to meet tax-reporting requirements. You
            may request deletion of your account at any time using the contact
            address below; we will honor the request within thirty days, subject
            to legal record-keeping obligations.
          </Block>

          <Block heading="06 — Cookies and analytics">
            We use a minimal first-party cookie to maintain your session if you
            create an account. We use privacy-preserving aggregate analytics
            (no third-party cookies, no cross-site tracking) to understand which
            pages people read. We do not use Facebook Pixel, Google Analytics, or
            any tracker that profiles you across sites.
          </Block>

          <Block heading="07 — Your rights">
            You can request a copy of the data we hold about you, request
            corrections, or request deletion. We honor GDPR, CCPA, and similar
            requests regardless of where you live. Send requests to {" "}
            <a className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink" href="mailto:privacy@dothenumberswork.com">
              privacy@dothenumberswork.com
            </a>
            .
          </Block>

          <Block heading="08 — Changes">
            If we change this policy in a material way, we will post the updated
            version here and email account holders. Non-material changes (typo
            fixes, clarifications) will be reflected in the &ldquo;last updated&rdquo;
            date.
          </Block>

          <Block heading="09 — Contact">
            Rusty Roof Media. Ann Arbor, Michigan, United States.{" "}
            <a className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink" href="mailto:privacy@dothenumberswork.com">
              privacy@dothenumberswork.com
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
