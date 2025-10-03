export function nettoyerEtGarderContenuTextuel(input: string): string {
  return input
    .replace(/[^a-zA-ZÀ-ÿ0-9\s.,!?;:'"’()\-\n]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
