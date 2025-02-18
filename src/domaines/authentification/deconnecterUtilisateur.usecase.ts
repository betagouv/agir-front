import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class DeconnecterUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(utilisateurId: string, postDeconnexionUrlCallBack: (url: string) => void): Promise<void> {
    const deconnexion = await this.utilisateurRepository.deconnecterUtilisateur(utilisateurId);
    if (deconnexion.doitSeDeconnecterDeFranceConnect) {
      postDeconnexionUrlCallBack(deconnexion.urlDeDeconnexion);
    } else {
      this.sessionRepository.deconnecterUtilisateur();
      postDeconnexionUrlCallBack('/');
    }
  }
}
