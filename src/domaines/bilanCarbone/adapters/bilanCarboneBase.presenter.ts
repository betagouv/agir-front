export class BilanCarboneBasePresenter {
  calculPourcentageProgressBar(nombreDeKg: number): number {
    const maxKg = 12000;
    const pourcentage = (nombreDeKg / maxKg) * 100;

    return Math.min(Math.max(pourcentage, 0), 100);
  }

  calculTonnesAnnuel(nombreDeKg: number): string {
    return (nombreDeKg / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
}
