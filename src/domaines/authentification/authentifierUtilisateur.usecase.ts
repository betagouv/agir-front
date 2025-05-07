import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class AuthentifierUtilisateurUsecase {
  constructor(private readonly utilisateurRepository: UtilisateurRepository) {}

  async execute(email: string): Promise<void> {
    await this.utilisateurRepository.envoyerUnMagicLink(email);
  }
}
