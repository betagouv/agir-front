import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { AppRawDataStorage } from '@/shell/appRawDataStorage';

export class DeconnecterUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
    private appRawDataStorage: AppRawDataStorage,
  ) {}

  async execute(utilisateurId: string, postDeconnexionUrlCallBack: (url: string) => void): Promise<void> {
    const deconnexion = await this.utilisateurRepository.deconnecterUtilisateur(utilisateurId);
    this.sessionRepository.deconnecterUtilisateur();
    this.appRawDataStorage.clearAllItems();
    if (deconnexion.doitSeDeconnecterDeFranceConnect) {
      postDeconnexionUrlCallBack(deconnexion.urlDeDeconnexion);
    } else {
      postDeconnexionUrlCallBack('/');
    }
  }
}
