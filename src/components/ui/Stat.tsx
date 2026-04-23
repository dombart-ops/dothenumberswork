import { ReactNode } from "react";

export default function Stat({
  value,
  label,
  footnote,
}: {
  value: ReactNode;
  label: string;
  footnote?: string;
}) {
  return (
    <div className="border-t border-line pt-5">
      <div className="num text-[2.25rem] leading-none text-ink tracking-tight">{value}</div>
      <div className="mt-3 text-[0.95rem] text-ink-500">{label}</div>
      {footnote ? (
        <div className="mt-2 text-[0.78rem] text-ink-400">{footnote}</div>
      ) : null}
    </div>
  );
}
