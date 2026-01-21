// src/components/layout/Section.tsx
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title?: string;

  /** outer section (bg, text color, vertical padding) */
  className?: string;

  /** scroll offset helper */
  scrollMarginTopClassName?: string;
}>;

export default function Section({
  id,
  title,
  children,
  className = "",
  scrollMarginTopClassName = "scroll-mt-24",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={title ?? id}
      className={["w-full", scrollMarginTopClassName, className].join(" ")}
    >
      {children}
    </section>
  );
}
