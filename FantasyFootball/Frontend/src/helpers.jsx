export default function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s+jr\.?$/i, "")
    .replace(/\./g, "")
    .trim();
}