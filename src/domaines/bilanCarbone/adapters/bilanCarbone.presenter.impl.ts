import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarbonDetailItemViewModel {
  label: string;
  emoji: string;
  impactKgAnnuel: {
    valeur: string;
    unite: string;
  };
  pourcentage: number;
}
interface BilanCarboneDetailViewModel extends BilanCarbonDetailItemViewModel {
  details: BilanCarbonDetailItemViewModel[];
}

export interface BilanCarboneViewModel {
  impactKgAnnuel: {
    valeur: string;
    unite: string;
  };
  impactKgHebdomadaire: {
    valeur: string;
    unite: string;
  };
  univers: BilanCarboneDetailViewModel[];
  top3: {
    label: string;
    emoji: string;
    pourcentage: string;
  }[];
}

export class BilanCarbonePresenterImpl implements BilanCarbonePresenter {
  constructor(private readonly bilanCarboneViewModel: (viewModel: BilanCarboneViewModel) => void) {}

  presente(bilanCarbone: BilanCarbone): void {
    const NOMBRE_SEMAINES_PAR_AN = 52;

    this.bilanCarboneViewModel({
      impactKgAnnuel: this.formateKg(bilanCarbone.impactKgAnnuel),
      impactKgHebdomadaire: this.formateKg(bilanCarbone.impactKgAnnuel / NOMBRE_SEMAINES_PAR_AN),
      univers: bilanCarbone.univers.map(univers => ({
        label: univers.universLabel,
        impactKgAnnuel: this.formateKg(univers.impactKgAnnuel),
        pourcentage: univers.pourcentage,
        emoji: univers.emoji,
        details: univers.details.map(detail => ({
          emoji: detail.emoji,
          label: detail.label,
          impactKgAnnuel: this.formateKg(detail.impactKgAnnuel),
          pourcentage: detail.pourcentage,
        })),
      })),
      top3: bilanCarbone.top3.map(top3 => ({
        emoji: top3.emoji,
        label: top3.label,
        pourcentage: top3.pourcentage,
      })),
    });
  }

  private formateKg(nombreDeKg: number): { valeur: string; unite: string } {
    return nombreDeKg >= 1000
      ? {
          valeur: `${(nombreDeKg / 1000).toFixed(1)}`,
          unite: 'tonnes',
        }
      : {
          valeur: `${nombreDeKg.toFixed(0)} `,
          unite: 'kg',
        };
  }
}
