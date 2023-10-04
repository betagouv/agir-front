import { OnboardingResultatPresenter } from '@/onboarding/ports/onboardingResultat.presenter';
import { OnboardingResultat } from '@/onboarding/evaluerOnboarding.usecase';

export interface OnboardingResultatViewModel {
  libelle: string;
  valeur: number;
}
export class OnboardingResultatPresenterImpl implements OnboardingResultatPresenter {
  constructor(private viewModel: (onboardingResultatViewModel: OnboardingResultatViewModel[]) => void) {}
  presente(resultat: OnboardingResultat) {
    this.viewModel(
      [
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
      ].sort((a, b) => b.valeur - a.valeur)
    );
  }
}
