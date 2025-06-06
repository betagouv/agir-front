import {
  DeconnexionFranceConnect,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class UtilisateurRepositoryMock implements UtilisateurRepository {
  private constructor(private casDeFranceConnect?: boolean) {}

  static nouvelleInstance(): UtilisateurRepositoryMock {
    return new UtilisateurRepositoryMock();
  }

  static seDeconnecterDeFranceConnect(): UtilisateurRepositoryMock {
    return new UtilisateurRepositoryMock(true);
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
    });
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    return Promise.resolve({
      id: 'utilisateurId',
      token: 'token',
    });
  }

  validerMagicLink(email: string, code: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: 'id',
      nom: '',
      prenom: '',
      mail: email,
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: 'token',
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
    });
  }

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: 'idUtilisateur',
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: 'token',
      pseudo: '',
      estUnUtilisateurFranceConnect: true,
      afficherMessageReset: false,
    });
  }

  deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect> {
    if (this.casDeFranceConnect) {
      return Promise.resolve({
        doitSeDeconnecterDeFranceConnect: true,
        urlDeDeconnexion: 'urlDeDeconnexion',
      });
    } else {
      return Promise.resolve({
        doitSeDeconnecterDeFranceConnect: false,
        urlDeDeconnexion: '/',
      });
    }
  }

  terminerMessageReset(_idUtilisateur: string): Promise<void> {
    return Promise.resolve();
  }

  envoyerUnMagicLink(_email: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
