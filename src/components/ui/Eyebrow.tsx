import { ReactNode } from "react";
import clsx from "clsx";

export default function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "h2";
}) {
  return (
    <Tag className={clsx("eyebrow", className)}>
      {children}
    </Tag>
  );
}
