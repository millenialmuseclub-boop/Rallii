/** Tolerate stale/shared URLs without duplicate or missing comparison cards. */
export function snowComparison(raw: string | null, known: string[]): [string, string] {
  const valid = [...new Set((raw ?? "whistler-blackcomb,zermatt").split(","))].filter(slug => known.includes(slug));
  for (const slug of ["whistler-blackcomb", "zermatt", ...known]) {
    if (valid.length >= 2) break;
    if (known.includes(slug) && !valid.includes(slug)) valid.push(slug);
  }
  return [valid[0], valid[1]];
}
