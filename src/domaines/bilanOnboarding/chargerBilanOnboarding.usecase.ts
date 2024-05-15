import { BilanOnboardingPresenter } from '@/domaines/bilanOnboarding/ports/bilanOnboarding.presenter';
import { BilanOnboardingRepository } from '@/domaines/bilanOnboarding/ports/bilanOnboarding.repository';

export class ChargerBilanOnboardingUsecase {
  constructor(private utilisateurRepository: BilanOnboardingRepository) {}

  async execute(utilisateurId: string, presenter: BilanOnboardingPresenter): Promise<void> {
    const resultat = await this.utilisateurRepository.recupererBilanOnboarding(utilisateurId);
    presenter.presente(resultat);
  }
}
