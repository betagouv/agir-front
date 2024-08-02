import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarboneDetailViewModel {
  universLabel: string;
  impactKgAnnuel: string;
  pourcentage: number;
}

export interface BilanCarboneViewModel {
  impactKgAnnuel: string;
  impactKgHebdomadaire: string;
  details: BilanCarboneDetailViewModel[];
}

const NOMBRE_SEMAINES_PAR_AN = 52;

export class BilanCarbonePresenterImpl implements BilanCarbonePresenter {
  constructor(private readonly bilanCarboneViewModel: (viewModel: BilanCarboneViewModel) => void) {}

  presente(bilanCarbone: BilanCarbone): void {
    this.bilanCarboneViewModel({
      impactKgAnnuel: this.formateKg(bilanCarbone.impactKgAnnuel),
      impactKgHebdomadaire: this.formateKg(bilanCarbone.impactKgAnnuel / NOMBRE_SEMAINES_PAR_AN),
      details: bilanCarbone.details.map(detail => ({
        universLabel: this.determineLabel(detail.universId, detail.universLabel),
        impactKgAnnuel: this.formateKg(detail.impactKgAnnuel),
        pourcentage: detail.pourcentage,
      })),
    });
  }

  private formateKg(nombreDeKg: number): string {
    if (nombreDeKg >= 1000) {
      const tonnes = nombreDeKg / 1000;
      const tonnesArrondies = tonnes.toFixed(1);
      return `${tonnesArrondies} tonnes`;
    }

    return `${nombreDeKg.toFixed()} kg`;
  }

  private determineLabel(universId: string, universLabel: string): string {
    switch (universId) {
      case 'transport':
        return `🚙 ${universLabel}`;
      case 'alimentation':
        return `🍛 ${universLabel}`;
      case 'logement':
        return `🏡 ${universLabel}`;
      case 'consommation':
        return `👕 ${universLabel}`;
      case 'services_societaux':
        return `🏥 ${universLabel}`;
      default:
        return universLabel;
    }
  }
}
