// src/components/playground/SvgLogoMotionIntro.tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Symbol from "@/assets/images/symbol-dark.svg?react";
import Tasakis from "@/assets/images/svg-TASAKIS.svg?react";
import Venture from "@/assets/images/svg-venture.svg?react";

type SvgLogoMotionIntroProps = {
  /** Called after the exit (slide-to-side) animation finishes */
  onComplete?: () => void;

  /** Overlay styling */
  className?: string; // e.g. "bg-black text-white"

  /** Sizes */
  symbolClassName?: string;
  tasakisClassName?: string;
  ventureClassName?: string;

  /** Vertical gap between symbol/tasakis/venture in px (20 by default) */
  gapPx?: number;

  /** Exit direction: "right" (default) or "left" */
  exitSide?: "right" | "left";
};

export default function SvgLogoMotionIntro({
  onComplete,
  className = "bg-black text-white",
  symbolClassName = "h-20 w-auto",
  tasakisClassName = "h-10 w-auto",
  ventureClassName = "h-10 w-auto",
  gapPx = 20,
  exitSide = "right",
}: SvgLogoMotionIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const overlay = rootRef.current;
      if (!overlay) return;

      const symbol = wrapRef.current?.querySelector(
        "svg:nth-child(1)",
      ) as SVGSVGElement | null;
      const tasakis = wrapRef.current?.querySelector(
        "svg:nth-child(2)",
      ) as SVGSVGElement | null;
      const venture = wrapRef.current?.querySelector(
        "svg:nth-child(3)",
      ) as SVGSVGElement | null;

      if (!symbol || !tasakis || !venture) return;

      // Initial states
      gsap.set(overlay, { xPercent: 0, opacity: 1 });
      gsap.set(symbol, {
        opacity: 0,
        scale: 0.9,
        transformOrigin: "50% 50%",
      });
      gsap.set([tasakis, venture], {
        opacity: 0,
        y: 12,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1) Symbol in
      tl.to(symbol, { opacity: 1, scale: 1, duration: 0.6 });

      // 2) Rotate symbol (no snap back)
      tl.to(symbol, { rotation: 360, duration: 1.2, ease: "power2.inOut" });

      // 3) Bring in TASAKIS + VENTURE before rotation ends
      tl.to(tasakis, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6").to(
        venture,
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.45",
      );

      // 4) Exit: slide to the side + fade
      tl.to(overlay, {
        xPercent: exitSide === "right" ? 100 : -100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.inOut",
      });

      // 5) Notify parent to mount <App />
      tl.add(() => onComplete?.());
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete, exitSide]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${className}`}
    >
      <div
        ref={wrapRef}
        className="flex flex-col items-center"
        style={{ gap: `${gapPx}px` }}
      >
        <Symbol className={symbolClassName} />
        <Tasakis className={tasakisClassName} />
        <Venture className={ventureClassName} />
      </div>
    </div>
  );
}
