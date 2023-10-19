import { UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

export class RenvoyerCoteOTPUsecase {
  constructor(private readonly utilisateurRepository: UtilisateurRepository) {}

  async execute(email: string): Promise<void> {
    await this.utilisateurRepository.renvoyerCodeOTP(email);
  }
}
