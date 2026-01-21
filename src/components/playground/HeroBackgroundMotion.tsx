import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type BgItem = { src: string; alt?: string };

type Props = {
  images: [BgItem, BgItem]; // ✅ exactly 2 (mutable tuple)
  overlayClassName?: string; // default "bg-black/55"

  firstHoldMs?: number; // default 3000
  holdMs?: number; // default 3800

  outDur?: number; // default 1.05
  inDur?: number; // default 1.65

  outX?: number; // default -1.4
  inStartX?: number; // default 2.0

  outBlur?: number; // default 8
  inBlur?: number; // default 12

  className?: string; // wrapper classes
};

export default function HeroBackgroundMotion({
  images,
  overlayClassName = "bg-black/55",
  firstHoldMs = 3000,
  holdMs = 3800,
  outDur = 1.05,
  inDur = 1.65,
  outX = -1.4,
  inStartX = 2.0,
  outBlur = 8,
  inBlur = 12,
  className = "",
}: Props) {
  const imgARef = useRef<HTMLImageElement | null>(null);
  const imgBRef = useRef<HTMLImageElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const isBActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const intervalRef = useRef<number | null>(null);
  const firstHoldRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (firstHoldRef.current !== null) {
      window.clearTimeout(firstHoldRef.current);
      firstHoldRef.current = null;
    }
  };

  const setInitial = (img0: BgItem, img1: BgItem) => {
    if (!imgARef.current || !imgBRef.current) return;

    // preload into DOM
    imgARef.current.src = img0.src;
    imgARef.current.alt = img0.alt ?? "";

    imgBRef.current.src = img1.src;
    imgBRef.current.alt = img1.alt ?? "";

    gsap.killTweensOf([imgARef.current, imgBRef.current, overlayRef.current]);

    gsap.set(imgARef.current, {
      opacity: 1,
      filter: "blur(0px)",
      xPercent: 0,
      scale: 1.02,
    });

    gsap.set(imgBRef.current, {
      opacity: 0,
      filter: `blur(${inBlur}px)`,
      xPercent: inStartX,
      scale: 1.06,
    });

    if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1 });

    isBActiveRef.current = false;
    isAnimatingRef.current = false;
  };

  const transition = () => {
    if (!imgARef.current || !imgBRef.current) return;
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const fromImg = isBActiveRef.current ? imgBRef.current : imgARef.current;
    const toImg = isBActiveRef.current ? imgARef.current : imgBRef.current;

    const tl = gsap.timeline({
      defaults: { ease: "sine.inOut" },
      onComplete: () => {
        isBActiveRef.current = !isBActiveRef.current;
        isAnimatingRef.current = false;
      },
    });

    // prep "to" layer
    tl.set(toImg, { opacity: 0, filter: `blur(${inBlur}px)` }, 0);
    tl.set(toImg, { xPercent: inStartX, scale: 1.06 }, 0);

    tl.set(fromImg, { willChange: "transform, filter, opacity" }, 0);
    tl.set(toImg, { willChange: "transform, filter, opacity" }, 0);

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0.82, duration: 0.7 }, 0);
    }

    // OUT
    tl.to(
      fromImg,
      {
        xPercent: outX,
        scale: 1.05,
        filter: `blur(${outBlur}px)`,
        opacity: 0.55,
        duration: outDur,
      },
      0,
    );

    // IN (overlap)
    tl.to(
      toImg,
      {
        opacity: 1,
        xPercent: 0,
        scale: 1.02,
        filter: "blur(0px)",
        duration: inDur,
        ease: "sine.out",
      },
      0.25,
    );

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 1, duration: 1.1 }, 0.35);
    }

    tl.set([fromImg, toImg], { willChange: "auto" });
  };

  const start = () => {
    clearTimers();

    // show first image for firstHoldMs
    firstHoldRef.current = window.setTimeout(() => {
      transition();

      intervalRef.current = window.setInterval(
        () => {
          transition();
        },
        holdMs + Math.round((outDur + inDur) * 1000),
      );
    }, firstHoldMs);
  };

  useLayoutEffect(() => {
    const img0 = images[0];
    const img1 = images[1];

    setInitial(img0, img1);
    start();

    return () => clearTimers();
    // ✅ rerun when sources change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images[0].src, images[1].src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* B (below) */}
      <img
        ref={imgBRef}
        src={images[1].src}
        alt={images[1].alt ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* A (top) */}
      <img
        ref={imgARef}
        src={images[0].src}
        alt={images[0].alt ?? ""}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div
        ref={overlayRef}
        className={`absolute inset-0 ${overlayClassName}`}
      />
    </div>
  );
}
