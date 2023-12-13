import { UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { OnboardingBilanPresenter } from '@/onboarding/ports/onboardingBilan.presenter';

export class ChargerBilanOnboardingUsecase {
  constructor(private utilisateurRepository: UtilisateurRepository) {}

  async execute(utilisateurId: string, presenter: OnboardingBilanPresenter): Promise<void> {
    const resultat = await this.utilisateurRepository.recupererBilanOnboarding(utilisateurId);
    presenter.presente(resultat);
  }
}
