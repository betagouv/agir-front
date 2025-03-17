import { BilanThematiquePresenter } from '@/domaines/bilanCarbone/ports/bilanThematique.presenter';
import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export type BilanThematiqueViewModel = {
  titreBilan: string;
  resume: string;
  details: {
    emoji: string;
    label: string;
    pourcentage: number;
    impactAnnuelEnKg: string;
  }[];
};

export class BilanThematiquePresenterImpl implements BilanThematiquePresenter {
  constructor(private readonly callback: (viewModel: BilanThematiqueViewModel) => void) {}

  presenteBilanThematique(bilan: BilanThematique, thematique: ClefThematiqueAPI) {
    const impactAnnuelEnTonnes = (bilan.impactAnnuelEnKg / 1000).toFixed(1);
    this.callback({
      titreBilan: `Votre bilan ${thematique}`,
      resume: `Vous avez terminé votre bilan ! Il est de <span class="text--bold">${impactAnnuelEnTonnes} tonnes</span> de CO2 par an pour votre ${thematique}`,
      details: bilan.details.map(detail => ({
        emoji: detail.emoji,
        label: detail.label,
        pourcentage: bilan.getPourcenterDetail(detail),
        impactAnnuelEnKg: Math.round(detail.impactAnnuelEnKg).toString(),
      })),
    });
  }
}
