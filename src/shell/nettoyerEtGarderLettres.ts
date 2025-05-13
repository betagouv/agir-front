export function nettoyerEtGarderLettres(input: string): string {
  return input
    .replace(/[^a-zA-Z\s\-\n]/g, '')
    .replace(/\s+/g, '')
    .trim();
}
