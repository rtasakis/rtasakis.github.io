export function getImageUrl(file: string): string {
  return new URL(`/src/assets/images/${file}`, import.meta.url).href;
}
