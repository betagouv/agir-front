import * as timers from 'node:timers';
import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

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

export interface BilanCarboneViewModelBase {
  titre: string;
}
export interface BilanCarboneCompletViewModel extends BilanCarboneViewModelBase {
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

export interface BilanCarbonePartielViewModel extends BilanCarboneViewModelBase {
  pourcentageCompletionTotal: number;
  categories: {
    label: string;
    tag: {
      wording: string;
      classes: string;
    };
  }[];

  universBilan: {
    contentId: string;
    label: string;
    urlImage: string;
    estTermine: boolean;
    pourcentageProgression: number;
    nombreTotalDeQuestion: number;
  }[];
}

export class BilanCarbonePresenterImpl implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielViewModel) => void,
  ) {}

  presenteBilanComplet(bilanCarbone: BilanCompletCarbone): void {
    const NOMBRE_SEMAINES_PAR_AN = 52;

    this.bilanCarboneViewModel({
      titre: 'Votre bilan <span class="text--bleu">environnemental</span>',
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

  presenteBilanPartiel(bilan: BilanPartielCarbone): void {
    this.bilanCarbonePartielViewModel({
      titre: 'Estimez votre <span class="text--bleu">bilan environnemental</span>',
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      categories: [
        {
          label: '🚙 Transports',
          tag: {
            wording: this.determineLabelNiveau(bilan.transport.niveau),
            classes: '',
          },
        },
        {
          label: '🥘 Alimentation',
          tag: {
            wording: this.determineLabelNiveau(bilan.alimentation.niveau),
            classes: '',
          },
        },
        {
          label: '🏡 Logement',
          tag: {
            wording: this.determineLabelNiveau(bilan.logement.niveau),
            classes: '',
          },
        },
        {
          label: '🛍 Consommation',
          tag: {
            wording: this.determineLabelNiveau(bilan.consommation.niveau),
            classes: '',
          },
        },
      ],
      universBilan: bilan.universBilan.map(univers => ({
        contentId: univers.contentId,
        label: univers.label,
        urlImage: univers.urlImage,
        estTermine: univers.estTermine,
        pourcentageProgression: univers.pourcentageProgression,
        nombreTotalDeQuestion: univers.nombreTotalDeQuestion,
      })),
    });
  }

  private determineLabelNiveau(niveau: 'moyen' | 'faible' | 'fort' | 'tres-fort'): string {
    switch (niveau) {
      case 'moyen':
        return 'Moyen';
      case 'faible':
        return 'Faible';
      case 'fort':
        return 'Fort';
      case 'tres-fort':
        return 'Très fort';
    }
  }
}
