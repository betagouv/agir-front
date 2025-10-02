import { NombreAfficheEnFR, NombreAfficheEnFRBuilder } from '@/shell/formatting/nombreAfficheEnFRBuilder';

export class BilanCarboneBasePresenter {
  calculPourcentageProgressBar(nombreDeKg: number): number {
    const maxKg = 12000;
    const pourcentage = (nombreDeKg / maxKg) * 100;

    return Math.min(Math.max(pourcentage, 0), 100);
  }

  calculTonnesAnnuel(nombreDeKg: number): NombreAfficheEnFR {
    return NombreAfficheEnFRBuilder.build(nombreDeKg / 1000, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
}
