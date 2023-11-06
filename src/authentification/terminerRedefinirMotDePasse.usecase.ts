import { UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

export class TerminerRedefinirMotDePasseUsecase {
  constructor(private utilisateurRepository: UtilisateurRepository) {}
  async execute(email: string, motDePasse: string, code: string): Promise<void> {
    await this.utilisateurRepository.terminerRedefinirMotDePasse(email, motDePasse, code);
  }
}
