import {
  HERO_CAROUSEL_CONFIG,
  type HeroCarouselMode,
} from "@/config/heroCarousel.config";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function getHeroCarouselTimings(mode: HeroCarouselMode = "default") {
  const cfg = HERO_CAROUSEL_CONFIG;

  const mult = cfg.autoplay.modeMultiplier[mode];
  const seconds = clamp(
    cfg.autoplay.baseSeconds * mult,
    cfg.autoplay.clampSeconds.min,
    cfg.autoplay.clampSeconds.max,
  );

  const bgSwapAt = cfg.timings.bgSwapAt;

  // content switch happens shortly after bg swap (premium "confirm" feel)
  const contentSwitchAt = bgSwapAt + cfg.timings.contentSwitchAfterBgSwap;

  return {
    autoplayDelayMs: seconds * 1000,

    bgSwapAt,

    contentSwitchAt,

    textOut: cfg.timings.textOut,
    textIn: cfg.timings.textIn,
  } as const;
}
