import { BilanCarboneBasePresenter } from '@/domaines/bilanCarbone/adapters/bilanCarboneBase.presenter';
import { ThematiqueBilanViewModel } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCarboneAccueilPresenter } from '@/domaines/bilanCarbone/ports/bilanCarboneAccueil.presenter';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { NombreAfficheEnFR } from '@/shell/nombreAfficheEnFRBuilder';

export interface BilanCarboneCompletAccueilViewModel {
  pourcentageProgressBar: number;
  nombreDeTonnesAnnuel: NombreAfficheEnFR;
}

export interface BilanCarbonePartielAccueilViewModel {
  pourcentageCompletionTotal: number;
  thematiquesBilan: ThematiqueBilanViewModel[];
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
      thematiquesBilan: bilan.thematiquesBilan.map(thematiqueBilan => ({
        label: MenuThematiques.getThematiqueData(thematiqueBilan.clefUnivers as ClefThematiqueAPI).labelDansLeMenu,
        contentId: thematiqueBilan.contentId,
        urlImage: thematiqueBilan.urlImage,
        estTermine: thematiqueBilan.estTermine,
        pourcentageProgression: thematiqueBilan.pourcentageProgression,
        nombreTotalDeQuestion: thematiqueBilan.nombreTotalDeQuestion,
        clefUnivers: thematiqueBilan.clefUnivers,
      })),
    });
  }
}
