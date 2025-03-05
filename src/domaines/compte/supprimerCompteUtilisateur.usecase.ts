import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';

export class SupprimerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(utilisateurId: string, postDeconnexionUrlCallBack: (url: string) => void): Promise<void> {
    const suppression = await this.compteUtilisateuRepository.supprimerCompteUtilisateur(utilisateurId);
    this.sessionRepository.deconnecterUtilisateur();
    if (suppression.doitSeDeconnecterDeFranceConnect) {
      postDeconnexionUrlCallBack(suppression.urlDeDeconnexion);
    } else {
      postDeconnexionUrlCallBack('/');
    }
  }
}
