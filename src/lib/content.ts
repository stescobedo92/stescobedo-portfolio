export const entrySlug = (entry: { id?: string; slug?: string }) =>
  (entry.slug ?? entry.id ?? '').replace(/\.(md|mdx)$/i, '').toLowerCase();
