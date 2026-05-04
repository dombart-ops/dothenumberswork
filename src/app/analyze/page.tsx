import type { Metadata } from "next";
import AnalyzeForm from "./AnalyzeForm";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Analyze a deal",
  description:
    "Enter your property and financing details. Receive cap rate, cash-on-cash, DSCR, IRR, four stress scenarios, and a composite grade in one report.",
  alternates: { canonical: "https://dothenumberswork.com/analyze" },
};

export default function AnalyzePage() {
  return (
    <section className="border-b border-line">
      <div className="container-editorial pt-20 pb-24 md:pt-28 md:pb-32 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Step 1 of 2</Eyebrow>
          <h1 className="mt-5 font-serif text-display-lg text-ink">
            Enter the deal.
          </h1>
          <p className="mt-6 text-[1.02rem] leading-[1.7] text-ink-500">
            Required fields are marked. Everything else has a sensible default
            you can override. The first three methodologies preview free.
            Unlock all twenty-three for $30.
          </p>
          <ul className="mt-10 space-y-4 text-[0.92rem] leading-relaxed text-ink-500 border-t border-line pt-6">
            <li className="flex gap-3">
              <span className="num text-ink-400 w-5 shrink-0 pt-0.5">01</span>
              <span>Property and financing inputs.</span>
            </li>
            <li className="flex gap-3">
              <span className="num text-ink-400 w-5 shrink-0 pt-0.5">02</span>
              <span>Income and expense lines (defaults provided).</span>
            </li>
            <li className="flex gap-3">
              <span className="num text-ink-400 w-5 shrink-0 pt-0.5">03</span>
              <span>Strategy selection unlocks BRRRR, flip, house hack math.</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-8">
          <AnalyzeForm />
        </div>
      </div>
    </section>
  );
}
