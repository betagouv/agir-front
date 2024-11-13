import { BilanCarboneBasePresenter } from '@/domaines/bilanCarbone/adapters/bilanCarboneBase.presenter';
import { BilanCarbonePresenter, ThematiquesBilan } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

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

  presenteBilanComplet(bilanCarbone: BilanCompletCarbone): void {
    this.bilanCarboneViewModel({
      pourcentageProgressBar: this.calculPourcentageProgressBar(bilanCarbone.impactKgAnnuel),
      nombreDeTonnesAnnuel: this.calculTonnesAnnuel(bilanCarbone.impactKgAnnuel),
    });
  }

  presenteBilanPartiel(bilan: BilanPartielCarbone): void {
    this.bilanCarbonePartielViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.thematiquesBilan.map(univers => ({
        clefUnivers: univers.clefUnivers,
        contentId: univers.contentId,
        label: univers.label,
        urlImage: univers.urlImage,
        estTermine: univers.estTermine,
        pourcentageProgression: univers.pourcentageProgression,
        nombreTotalDeQuestion: univers.nombreTotalDeQuestion,
      })),
    });
  }
}
