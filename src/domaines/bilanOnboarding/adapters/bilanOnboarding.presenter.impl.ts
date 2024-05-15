import { BilanOnboardingPresenter } from '@/domaines/bilanOnboarding/ports/bilanOnboarding.presenter';
import { OnboardingResultat } from '@/domaines/onboarding/evaluerOnboarding.usecase';

export interface OnboardingBilanViewModel {
  resultat: {
    libelle: string;
    valeur: number;
  }[];
}

export class BilanOnboardingPresenterImpl implements BilanOnboardingPresenter {
  constructor(private viewModel: (onboardingBilanViewModel: OnboardingBilanViewModel) => void) {}
  presente(resultat: OnboardingResultat) {
    this.viewModel({
      resultat: [
        {
          libelle: '🚗 Transports',
          valeur: resultat.transports,
        },
        {
          libelle: '🏡 Logement',
          valeur: resultat.logement,
        },
        {
          libelle: '🛒 Consommation',
          valeur: resultat.consommation,
        },
        {
          libelle: '🥦 Alimentation',
          valeur: resultat.alimentation,
        },
      ].sort((a, b) => b.valeur - a.valeur),
    });
  }
}
