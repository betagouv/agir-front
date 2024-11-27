import { BilanCarboneBasePresenter } from '@/domaines/bilanCarbone/adapters/bilanCarboneBase.presenter';
import { BilanCarbonePresenter, ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarbone, NiveauImpactBilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

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
  thematiquesBilan: ThematiquesBilan[];
}

export interface BilanCarboneCompletViewModel extends BilanCarboneViewModelBase {
  pourcentageProgressBar: number;
  nombreDeTonnesAnnuel: string;
  impactKgAnnuel: {
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

interface BilanCarbonePartielTagViewModel {
  wording: string;
  classes: string;
}

export interface BilanCarbonePartielViewModel extends BilanCarboneViewModelBase {
  pourcentageCompletionTotal: number;
  categories: {
    label: string;
    tag: BilanCarbonePartielTagViewModel;
    progressBarStyle: string;
  }[];
}

export interface BilanCarboneAFaireViewModel {
  pourcentageCompletionTotal: number;
  thematiquesBilan: ThematiquesBilan[];
}

export class BilanCarbonePresenterImpl extends BilanCarboneBasePresenter implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielViewModel) => void,
    private readonly bilanCarboneAFaireViewModel: (viewModel: BilanCarboneAFaireViewModel) => void,
  ) {
    super();
  }

  presenteBilanComplet(bilanCarbone: BilanCarbone): void {
    this.bilanCarboneViewModel({
      titre: 'Mon bilan <span class="text--bleu">environnemental</span>',
      pourcentageProgressBar: this.calculPourcentageProgressBar(bilanCarbone.bilanComplet!.impactKgAnnuel),
      nombreDeTonnesAnnuel: this.calculTonnesAnnuel(bilanCarbone.bilanComplet!.impactKgAnnuel),
      impactKgAnnuel: this.formateKg(bilanCarbone.bilanComplet!.impactKgAnnuel),
      univers: bilanCarbone.bilanComplet!.univers.map(univers => ({
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
      top3: bilanCarbone.bilanComplet!.top3.map(top3 => ({
        emoji: top3.emoji,
        label: top3.label,
        pourcentage: top3.pourcentage,
      })),
      thematiquesBilan: bilanCarbone.thematiquesBilan,
    });
  }

  presenteBilanPartiel(bilanCarbone: BilanCarbone): void {
    this.bilanCarbonePartielViewModel({
      titre: 'Estimez mon <span class="text--bleu">bilan environnemental</span>',
      pourcentageCompletionTotal: bilanCarbone.bilanPartiel!.pourcentageCompletionTotal,
      categories: [
        {
          label: '🚙 Transports',
          tag: this.determineTag(bilanCarbone.bilanPartiel!.transport.niveau),
          progressBarStyle: this.determineProgressBar(bilanCarbone.bilanPartiel!.transport.niveau),
        },
        {
          label: '🥘 Alimentation',
          tag: this.determineTag(bilanCarbone.bilanPartiel!.alimentation.niveau),
          progressBarStyle: this.determineProgressBar(bilanCarbone.bilanPartiel!.alimentation.niveau),
        },
        {
          label: '🏡 Logement',
          tag: this.determineTag(bilanCarbone.bilanPartiel!.logement.niveau),
          progressBarStyle: this.determineProgressBar(bilanCarbone.bilanPartiel!.logement.niveau),
        },
        {
          label: '🛍 Consommation',
          tag: this.determineTag(bilanCarbone.bilanPartiel!.consommation.niveau),
          progressBarStyle: this.determineProgressBar(bilanCarbone.bilanPartiel!.consommation.niveau),
        },
      ],
      thematiquesBilan: bilanCarbone.thematiquesBilan,
    });
  }

  presenteBilanAFaire(bilan: BilanCarbone): void {
    this.bilanCarboneAFaireViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.thematiquesBilan,
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

  private determineProgressBar(niveau: NiveauImpactBilanCarbone): string {
    switch (niveau) {
      case 'faible':
        return 'progress-bar-impact-faible';
      case 'moyen':
        return 'progress-bar-impact-moyen';
      case 'fort':
        return 'progress-bar-impact-fort';
      case 'tres_fort':
        return 'progress-bar-impact-tres-fort';
    }
  }

  private determineTag(niveau: NiveauImpactBilanCarbone): BilanCarbonePartielTagViewModel {
    switch (niveau) {
      case 'faible':
        return {
          wording: 'Faible',
          classes: 'tag-impact-faible',
        };
      case 'moyen':
        return {
          wording: 'Moyen',
          classes: 'tag-impact-moyen',
        };
      case 'fort':
        return {
          wording: 'Fort',
          classes: 'tag-impact-fort',
        };
      case 'tres_fort':
        return {
          wording: 'Très fort',
          classes: 'tag-impact-tres-fort',
        };
    }
  }
}
