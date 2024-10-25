export function calculPourcentageProgressBar(nombreDeKg: number): number {
  const maxKg = 12000;
  const pourcentage = (nombreDeKg / maxKg) * 100;

  return Math.min(Math.max(pourcentage, 0), 100);
}
