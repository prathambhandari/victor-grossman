/** Max meta description length (≈1000px in Google/Seobility). */
export const META_DESCRIPTION_MAX = 155;

export function truncateMetaDescription(
  text: string,
  max = META_DESCRIPTION_MAX,
): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}
