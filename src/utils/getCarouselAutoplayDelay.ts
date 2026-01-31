import { CAROUSEL_CONFIG } from "@/config/carousel.config";

type GetAutoplayDelayParams = {
  mode?: "default" | "reading";
};

export function getCarouselAutoplayDelay(
  params: GetAutoplayDelayParams = {},
): number {
  const { mode = "default" } = params;

  const { baseSeconds, readingMultiplier, minSeconds, maxSeconds } =
    CAROUSEL_CONFIG.autoplay;

  let seconds =
    mode === "reading" ? baseSeconds * readingMultiplier : baseSeconds;

  seconds = Math.max(minSeconds, seconds);
  seconds = Math.min(maxSeconds, seconds);

  return seconds * 1000; // ms
}
