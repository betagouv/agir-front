import { BilanThematiquePresenter } from '@/domaines/bilanCarbone/ports/bilanThematique.presenter';
import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';

export type BilanThematiqueViewModel = {
  impactAnnuelEnTonnes: string;
  details: {
    emoji: string;
    label: string;
    pourcentage: number;
    impactAnnuelEnKg: string;
  }[];
};

export class BilanThematiquePresenterImpl implements BilanThematiquePresenter {
  constructor(private readonly callback: (viewModel: BilanThematiqueViewModel) => void) {}

  presenteBilanThematique(bilan: BilanThematique) {
    this.callback({
      impactAnnuelEnTonnes: (bilan.impactAnnuelEnKg / 1000).toFixed(2),
      details: bilan.details.map(detail => ({
        emoji: detail.emoji,
        label: detail.label,
        pourcentage: bilan.getPourcenterDetail(detail),
        impactAnnuelEnKg: detail.impactAnnuelEnKg.toFixed(2),
      })),
    });
  }
}
