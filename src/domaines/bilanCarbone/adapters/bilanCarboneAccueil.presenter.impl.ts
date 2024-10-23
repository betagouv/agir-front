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

export class BilanCarboneAccueilPresenterImpl implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletAccueilViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielAccueilViewModel) => void,
  ) {}

  presenteBilanComplet(bilanCarbone: BilanCompletCarbone): void {
    this.bilanCarboneViewModel({
      pourcentageProgressBar: this.calculPourcentageProgressBar(bilanCarbone.impactKgAnnuel),
      nombreDeTonnesAnnuel: this.calculTonnesAnnuel(bilanCarbone.impactKgAnnuel),
    });
  }

  presenteBilanPartiel(bilan: BilanPartielCarbone): void {
    const mapUnivers: Map<number, string> = new Map([
      [0, 'transports'],
      [1, 'alimentation'],
      [2, 'logement'],
      [3, 'consommation'],
    ]);
    this.bilanCarbonePartielViewModel({
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      thematiquesBilan: bilan.universBilan.map((univers, index) => ({
        nomDeLunivers: mapUnivers.get(index) || '',
        contentId: univers.contentId,
        label: univers.label,
        urlImage: univers.urlImage,
        estTermine: univers.estTermine,
        pourcentageProgression: univers.pourcentageProgression,
        nombreTotalDeQuestion: univers.nombreTotalDeQuestion,
      })),
    });
  }

  private calculPourcentageProgressBar(nombreDeKg: number): number {
    const maxKg = 12000;
    const pourcentage = (nombreDeKg / maxKg) * 100;

    return Math.min(Math.max(pourcentage, 0), 100);
  }

  private calculTonnesAnnuel(nombreDeKg: number): string {
    return (nombreDeKg / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
}
