import { OnboardingResultat } from '@/onboarding/evaluerOnboarding.usecase';
import { OnboardingBilanPresenter } from '@/onboarding/ports/onboardingBilan.presenter';

export interface OnboardingBilanViewModel {
  resultat: {
    libelle: string;
    valeur: number;
  }[];
}

export class OnboardingBilanPresenterImpl implements OnboardingBilanPresenter {
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
