import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class MockUtilisateurRepository implements UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<void> {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
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

  validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
    return Promise.resolve('utilisateurId');
  }

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: 'id',
      nom: '',
      prenom: '',
      mail: email,
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
    });
  }
}
