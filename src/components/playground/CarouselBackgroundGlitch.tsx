import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

type Props = {
  src: string;
  alt?: string;
  overlayClassName?: string; // default "bg-black/55"
  className?: string;
};

export type CarouselBgHandle = {
  glitchTo: (next: { src: string; alt?: string }) => void;
  glitch: () => void; // glitch current image (no swap)
};

const CarouselBackgroundGlitch = forwardRef<CarouselBgHandle, Props>(
  function CarouselBackgroundGlitch(
    { src, alt = "", overlayClassName = "bg-black/55", className = "" }: Props,
    ref,
  ) {
    const baseRef = useRef<HTMLImageElement | null>(null);
    const rRef = useRef<HTMLImageElement | null>(null);
    const cRef = useRef<HTMLImageElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const isAnimatingRef = useRef(false);

    const setAllSrc = (s: string, a?: string) => {
      if (!baseRef.current || !rRef.current || !cRef.current) return;
      baseRef.current.src = s;
      baseRef.current.alt = a ?? "";

      rRef.current.src = s;
      rRef.current.alt = a ?? "";

      cRef.current.src = s;
      cRef.current.alt = a ?? "";
    };

    const resetVisual = () => {
      if (!baseRef.current || !rRef.current || !cRef.current) return;

      gsap.killTweensOf([
        baseRef.current,
        rRef.current,
        cRef.current,
        overlayRef.current,
      ]);

      gsap.set(baseRef.current, { opacity: 1, x: 0, y: 0, filter: "none" });

      // “RGB split” layers (red/cyan)
      gsap.set(rRef.current, {
        opacity: 0,
        x: 0,
        y: 0,
        filter: "none",
        clipPath: "inset(0% 0% 0% 0%)",
      });
      gsap.set(cRef.current, {
        opacity: 0,
        x: 0,
        y: 0,
        filter: "none",
        clipPath: "inset(0% 0% 0% 0%)",
      });

      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 1 });
    };
const glitch = () => {
  if (!baseRef.current || !rRef.current || !cRef.current) return;
  if (isAnimatingRef.current) return;

  isAnimatingRef.current = true;

  const tl = gsap.timeline({
    onComplete: () => {
      resetVisual();
      isAnimatingRef.current = false;
    },
  });

  // show split layers softly
  tl.set([rRef.current, cRef.current], { opacity: 0.65 }, 0);

  // subtle RGB offset
  tl.set(rRef.current, {
    filter: "drop-shadow(1.5px 0 0 rgba(255,0,60,0.8))",
  }, 0);
  tl.set(cRef.current, {
    filter: "drop-shadow(-1.5px 0 0 rgba(0,255,255,0.8))",
  }, 0);

  // smooth micro drift
  tl.to(
    baseRef.current,
    {
      x: -3,
      duration: 0.08,
      ease: "sine.inOut",
    },
    0,
  );
  tl.to(
    baseRef.current,
    {
      x: 2,
      duration: 0.08,
      ease: "sine.inOut",
    },
    0.08,
  );
  tl.to(
    baseRef.current,
    {
      x: 0,
      duration: 0.1,
      ease: "sine.out",
    },
    0.16,
  );

  // gentle slice morphing (no hard jumps)
  tl.to(
    rRef.current,
    {
      x: -4,
      clipPath: "inset(12% 0% 58% 0%)",
      duration: 0.12,
      ease: "sine.inOut",
    },
    0,
  );

  tl.to(
    cRef.current,
    {
      x: 4,
      clipPath: "inset(52% 0% 18% 0%)",
      duration: 0.12,
      ease: "sine.inOut",
    },
    0.04,
  );

  tl.to(
    rRef.current,
    {
      x: 2,
      clipPath: "inset(28% 0% 38% 0%)",
      duration: 0.14,
      ease: "sine.out",
    },
    0.14,
  );

  tl.to(
    cRef.current,
    {
      x: -2,
      clipPath: "inset(18% 0% 55% 0%)",
      duration: 0.14,
      ease: "sine.out",
    },
    0.18,
  );

  // soft contrast pulse
  tl.to(
    baseRef.current,
    {
      filter: "contrast(1.08) brightness(1.03)",
      duration: 0.1,
      ease: "sine.out",
    },
    0.06,
  );
  tl.to(
    baseRef.current,
    {
      filter: "none",
      duration: 0.18,
      ease: "sine.out",
    },
    0.18,
  );

  // overlay breathing instead of flashing
  if (overlayRef.current) {
    tl.to(
      overlayRef.current,
      {
        opacity: 0.9,
        duration: 0.12,
        ease: "sine.inOut",
      },
      0.06,
    );
    tl.to(
      overlayRef.current,
      {
        opacity: 1,
        duration: 0.22,
        ease: "sine.out",
      },
      0.18,
    );
  }

  return tl;
};

    const glitchTo = (next: { src: string; alt?: string }) => {
      if (isAnimatingRef.current) return;

      // 1) glitch current
      const tl = glitch();

      // 2) swap source mid-glitch (tiny moment)
      if (tl) {
        tl.add(() => {
          setAllSrc(next.src, next.alt);
        }, 0.11);
      }
    };

    useImperativeHandle(ref, () => ({
      glitchTo,
      glitch,
    }));

    useLayoutEffect(() => {
      setAllSrc(src, alt);
      resetVisual();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Base */}
        <img
          ref={baseRef}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* RGB split layers */}
        <img
          ref={rRef}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
          draggable={false}
        />
        <img
          ref={cRef}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
          draggable={false}
        />

        <div
          ref={overlayRef}
          className={`absolute inset-0 ${overlayClassName}`}
        />
      </div>
    );
  },
);

export default CarouselBackgroundGlitch;
