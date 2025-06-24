import { OnboardingRepository } from '@/domaines/onboarding/ports/onboarding.repository';

export class OnboardingEtape1Usecase {
  constructor(private readonly onboardingRepository: OnboardingRepository) {}

  async execute(
    idUtilisateur: string,
    pseudo: string,
    dateDeNaissance?: {
      jour: string;
      mois: string;
      annee: string;
    },
  ): Promise<void> {
    await this.onboardingRepository.validationEtape1(idUtilisateur, pseudo, dateDeNaissance);
  }
}
