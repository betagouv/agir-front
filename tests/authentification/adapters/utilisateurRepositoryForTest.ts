import {
  DeconnexionFranceConnect,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class UtilisateurRepositoryForTest implements UtilisateurRepository {
  private constructor(
    private onboardingRealise = true,
    private avecPageReset = false,
  ) {}

  static avecOnBoardingRealiseEtAvecPageReset() {
    return new UtilisateurRepositoryForTest(true, true);
  }

  static avecOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(true);
  }

  static sansOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(false);
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      onboardingAEteRealise: this.onboardingRealise,
      afficherDisclaimerAides: false,
      pseudo: 'johndoe',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: this.avecPageReset,
    });
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  validerMagicLink(email: string, code: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: email,
      onboardingAEteRealise: this.onboardingRealise,
      afficherDisclaimerAides: false,
      pseudo: 'johndoe',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: this.avecPageReset,
    });
  }

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      onboardingAEteRealise: this.onboardingRealise,
      afficherDisclaimerAides: false,
      pseudo: 'johndoe',
      estUnUtilisateurFranceConnect: true,
      afficherMessageReset: this.avecPageReset,
    });
  }

  deconnecterUtilisateur(_idUtilisateur: string): Promise<DeconnexionFranceConnect> {
    throw Error;
  }

  terminerMessageReset(_idUtilisateur: string): Promise<void> {
    throw Error;
  }

  envoyerUnMagicLink(_email: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
