export function isDuplicateTerm(words, term) {
  if (!Array.isArray(words) || !term) return false;
  const norm = String(term).trim().toLowerCase();
  if (!norm) return false;
  return words.some((w) => (w?.term ?? '').toLowerCase() === norm);
}
