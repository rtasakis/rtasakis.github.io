export function toHtml(html: string): string {
  if (!html) return "";

  return (
    html
      // remove HTML comments only
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim()
  );
}
