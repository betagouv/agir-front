import { BilanCarbonePresenter, ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { calculPourcentageProgressBar } from '@/domaines/bilanCarbone/utils/calculPourcentageProgressBar';
import { calculTonnesAnnuel } from '@/domaines/bilanCarbone/utils/calculTonnesAnnuel';

export interface BilanCarboneCompletAccueilViewModel {
  pourcentageProgressBar: number;
  nombreDeTonnesAnnuel: string;
}

export interface BilanCarbonePartielAccueilViewModel {
  pourcentageCompletionTotal: number;
  thematiquesBilan: ThematiquesBilan[];
}

export class BilanCarboneAccueilPresenterImpl implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletAccueilViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielAccueilViewModel) => void,
  ) {}

  presenteBilanComplet(bilanCarbone: BilanCompletCarbone): void {
    this.bilanCarboneViewModel({
      pourcentageProgressBar: calculPourcentageProgressBar(bilanCarbone.impactKgAnnuel),
      nombreDeTonnesAnnuel: calculTonnesAnnuel(bilanCarbone.impactKgAnnuel),
    });
  }

  presenteBilanPartiel(bilan: BilanPartielCarbone): void {
    this.bilanCarbonePartielViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.universBilan,
    });
  }
}
