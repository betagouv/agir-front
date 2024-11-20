import { BilanCarboneBasePresenter } from '@/domaines/bilanCarbone/adapters/bilanCarboneBase.presenter';
import { BilanCarbonePresenter, ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarboneCompletAccueilViewModel {
  pourcentageProgressBar: number;
  nombreDeTonnesAnnuel: string;
}

export interface BilanCarbonePartielAccueilViewModel {
  pourcentageCompletionTotal: number;
  thematiquesBilan: ThematiquesBilan[];
}

export class BilanCarboneAccueilPresenterImpl extends BilanCarboneBasePresenter implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletAccueilViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielAccueilViewModel) => void,
  ) {
    super();
  }

  presenteBilanComplet(bilanCarbone: BilanCarbone): void {
    this.bilanCarboneViewModel({
      pourcentageProgressBar: this.calculPourcentageProgressBar(bilanCarbone.bilanComplet!.impactKgAnnuel),
      nombreDeTonnesAnnuel: this.calculTonnesAnnuel(bilanCarbone.bilanComplet!.impactKgAnnuel),
    });
  }

  presenteBilanPartiel(bilan: BilanCarbone): void {
    this.bilanCarbonePartielViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.thematiquesBilan,
    });
  }
}
