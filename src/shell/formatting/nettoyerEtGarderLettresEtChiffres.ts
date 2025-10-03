export function nettoyerEtGarderLettresEtChiffres(input: string): string {
  return input
    .replace(/[^a-z0-9A-Z\s\-\n]/g, '')
    .replace(/\s+/g, '')
    .trim();
}
