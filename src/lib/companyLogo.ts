type Named = { name: string; logo_url: string | null };

/**
 * Resolve the logos for a speaker's companies.
 *
 * `companies` is a '·'-separated list of exact record names. Matching is exact on
 * purpose: an earlier fuzzy version resolved Prof. Chakravarthy's "IIT Madras" to
 * "GDC, IIT Madras", which is a different organisation entirely.
 */
export function findLogos(
  companies: string | null | undefined,
  ...sources: (Named[] | undefined)[]
): { name: string; url: string }[] {
  if (!companies) return [];
  const index = new Map<string, string>();
  for (const list of sources) {
    for (const c of list ?? []) {
      if (c.logo_url && !index.has(c.name.toLowerCase())) {
        index.set(c.name.toLowerCase(), c.logo_url);
      }
    }
  }

  return companies
    .split('·')
    .map((n) => n.trim())
    .filter(Boolean)
    .map((name) => ({ name, url: index.get(name.toLowerCase()) }))
    .filter((c): c is { name: string; url: string } => Boolean(c.url));
}
