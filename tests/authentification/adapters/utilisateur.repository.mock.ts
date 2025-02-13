import {
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class UtilisateurRepositoryMock implements UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<void> {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
    });
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  commencerRedefinirMotDePasse(email: string): void {
    throw Error;
  }

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    return Promise.resolve({
      id: 'utilisateurId',
      token: 'token',
    });
  }

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: 'id',
      nom: '',
      prenom: '',
      mail: email,
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: 'token',
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
    });
  }

  deconnecterUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error('not implemented yet');
  }
}
