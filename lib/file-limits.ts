export function filePackError(
  current: { size: number }[],
  incoming: { size: number }[],
): string | null {
  if (current.length + incoming.length > 40)
    return "Use up to 40 files per document pack.";
  if (
    incoming.some(
      (f) =>
        !Number.isFinite(f.size) || f.size < 0 || f.size > 25 * 1024 * 1024,
    )
  )
    return "Each file must be 25 MB or smaller.";
  if (
    [...current, ...incoming].reduce((sum, f) => sum + f.size, 0) >
    200 * 1024 * 1024
  )
    return "Keep your document pack at or below 200 MB.";
  return null;
}
