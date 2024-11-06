import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class UtilisateurRepositoryForTest implements UtilisateurRepository {
  static avecOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(true);
  }

  static sansOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(false);
  }

  private constructor(private onboardingRealise = true) {}

  authentifierUtilisateur(nomUtilisateur: string, motDePasse: string): Promise<void> {
    return Promise.resolve();
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: this.onboardingRealise,
      afficherDisclaimerAides: false,
    });
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    throw Error;
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

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: email,
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: this.onboardingRealise,
      afficherDisclaimerAides: false,
    });
  }
}
