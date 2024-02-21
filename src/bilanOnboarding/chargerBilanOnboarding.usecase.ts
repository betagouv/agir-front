import { BilanOnboardingRepository } from '@/bilanOnboarding/ports/bilanOnboarding.repository';
import { BilanOnboardingPresenter } from '@/bilanOnboarding/ports/bilanOnboarding.presenter';

export class ChargerBilanOnboardingUsecase {
  constructor(private utilisateurRepository: BilanOnboardingRepository) {}

  async execute(utilisateurId: string, presenter: BilanOnboardingPresenter): Promise<void> {
    const resultat = await this.utilisateurRepository.recupererBilanOnboarding(utilisateurId);
    presenter.presente(resultat);
  }
}
