import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class DeconnecterUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(utilisateurId: string): Promise<void> {
    await this.utilisateurRepository.deconnecterUtilisateur(utilisateurId);
    this.sessionRepository.deconnecterUtilisateur();
  }
}
