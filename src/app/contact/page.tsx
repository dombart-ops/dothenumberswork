import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Do The Numbers Work for support, methodology questions, partnerships, or press.",
  alternates: { canonical: "https://dothenumberswork.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-editorial pt-20 pb-12">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-serif text-display-xl text-ink max-w-3xl">
            One inbox per kind of question.
          </h1>
          <p className="mt-8 max-w-2xl text-[1.075rem] leading-[1.7] text-ink-500">
            We keep contact addresses purpose-built so the right person sees your
            message. Pick the one that matches what you need.
          </p>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="container-editorial py-20 grid gap-px bg-line md:grid-cols-2">
          <Address
            label="Support"
            email="support@dothenumberswork.com"
            blurb="Trouble accessing a report you paid for, an account question, or a billing issue."
          />
          <Address
            label="Editorial / methodology"
            email="editorial@dothenumberswork.com"
            blurb="Methodology corrections, formula questions, suggestions for new metrics, or research collaborations."
          />
          <Address
            label="Privacy"
            email="privacy@dothenumberswork.com"
            blurb="Data access, correction, deletion, or any GDPR or CCPA request."
          />
          <Address
            label="Press"
            email="press@dothenumberswork.com"
            blurb="Media requests, interview scheduling, or background on the methodology."
          />
        </div>
      </section>

      <section>
        <div className="container-editorial py-16">
          <p className="text-[0.95rem] text-ink-400 max-w-prose">
            Mailing address: Rusty Roof Media, Ann Arbor, Michigan, United States.
            We respond to most messages within two business days.
          </p>
        </div>
      </section>
    </>
  );
}

function Address({
  label,
  email,
  blurb,
}: {
  label: string;
  email: string;
  blurb: string;
}) {
  return (
    <div className="bg-ivory p-8">
      <p className="eyebrow">{label}</p>
      <a
        href={`mailto:${email}`}
        className="mt-3 block font-serif text-[1.4rem] text-ink hover:text-navy"
      >
        {email}
      </a>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{blurb}</p>
    </div>
  );
}
