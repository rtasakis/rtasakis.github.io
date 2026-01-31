export type HeroCarouselMode = "default" | "reading";

export const HERO_CAROUSEL_CONFIG = {
  autoplay: {
    baseSeconds: 10,
    modeMultiplier: {
      default: 1,
      reading: 3, // 10 * 3 = 30s
    },
    clampSeconds: { min: 8, max: 60 },
  },

  timings: {
    // background component swaps image at this time (seconds)
    bgSwapAt: 0.11,

    // text out animation
    textOut: {
      duration: 0.32,
      stagger: 0.04,
    },

    // text in animation
    textIn: {
      duration: 0.95,
      stagger: 0.09,
    },

    // when to switch React content (seconds)
    // by default: align it with bgSwapAt + a small confirm offset
    contentSwitchAfterBgSwap: 0.07, // 0.11 + 0.07 = 0.18
  },
} as const;
