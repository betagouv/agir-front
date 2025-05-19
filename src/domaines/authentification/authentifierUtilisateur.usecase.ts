import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class AuthentifierUtilisateurUsecase {
  constructor(
    private readonly utilisateurRepository: UtilisateurRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(email: string): Promise<void> {
    await this.utilisateurRepository.envoyerUnMagicLink(email);
    this.sessionRepository.sauvegarderUtilisateur({
      mail: email,
    });
  }
}
