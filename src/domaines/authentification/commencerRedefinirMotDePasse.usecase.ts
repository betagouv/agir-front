import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class CommencerRedefinirMotDePasseUsecase {
  constructor(private utilisateurRepository: UtilisateurRepository) {}
  async execute(email: string): Promise<void> {
    await this.utilisateurRepository.commencerRedefinirMotDePasse(email);
  }
}
