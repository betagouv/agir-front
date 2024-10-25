export function calculTonnesAnnuel(nombreDeKg: number): string {
  return (nombreDeKg / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
