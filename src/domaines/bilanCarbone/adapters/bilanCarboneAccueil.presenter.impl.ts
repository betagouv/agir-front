import { BilanCarboneBasePresenter } from '@/domaines/bilanCarbone/adapters/bilanCarboneBase.presenter';
import { ThematiquesBilanViewModel } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarboneAccueilPresenter } from '@/domaines/bilanCarbone/ports/bilanCarboneAccueil.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarboneCompletAccueilViewModel {
  pourcentageProgressBar: number;
  nombreDeTonnesAnnuel: string;
}

export interface BilanCarbonePartielAccueilViewModel {
  pourcentageCompletionTotal: number;
  thematiquesBilan: ThematiquesBilanViewModel[];
}

export class BilanCarboneAccueilPresenterImpl
  extends BilanCarboneBasePresenter
  implements BilanCarboneAccueilPresenter
{
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletAccueilViewModel) => void,
    private readonly bilanCarboneAFaireViewModel: (viewModel: BilanCarbonePartielAccueilViewModel) => void,
  ) {
    super();
  }

  presenteBilanComplet(bilanCarbone: BilanCarbone): void {
    this.bilanCarboneViewModel({
      pourcentageProgressBar: this.calculPourcentageProgressBar(bilanCarbone.bilanComplet!.impactKgAnnuel),
      nombreDeTonnesAnnuel: this.calculTonnesAnnuel(bilanCarbone.bilanComplet!.impactKgAnnuel),
    });
  }

  presenteBilanAFaire(bilan: BilanCarbone): void {
    this.bilanCarboneAFaireViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.thematiquesBilan,
    });
  }
}
