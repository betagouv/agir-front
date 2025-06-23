import { OnboardingRepository } from '@/domaines/onboarding/ports/onboarding.repository';

export class OnboardingEtape2Usecase {
  constructor(private readonly onboardingRepository: OnboardingRepository) {}

  async execute(
    idUtilisateur: string,
    infoCommune: {
      codeEpci: string;
      codePostal: string;
    },
  ): Promise<void> {
    await this.onboardingRepository.validationEtape2(idUtilisateur, infoCommune);
  }
}
