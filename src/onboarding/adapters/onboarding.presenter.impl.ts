import { OnboardingResultatPresenter } from '@/onboarding/ports/onboardingResultat.presenter';
import { OnboardingResultat } from '@/onboarding/evaluerOnboarding.usecase';

export interface OnboardingResultatViewModel {
  resultat: {
    libelle: string;
    valeur: number;
  }[];
  phrase: string;
}
export class OnboardingResultatPresenterImpl implements OnboardingResultatPresenter {
  constructor(private viewModel: (onboardingResultatViewModel: OnboardingResultatViewModel) => void) {}
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
      phrase: resultat.phrase,
    });
  }
}
