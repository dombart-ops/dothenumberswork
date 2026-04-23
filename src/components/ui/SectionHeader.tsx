import { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 font-serif text-display-md text-ink">{title}</h2>
      {lede ? (
        <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-500 max-w-2xl">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
