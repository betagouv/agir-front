import {
  CompteUtilisateur,
  CompteUtilisateurRepository,
  SuppressionFranceConnect,
} from '@/domaines/compte/ports/compteUtilisateur.repository';

export class CompteUtilisateurRepositoryMock implements CompteUtilisateurRepository {
  private franceConnect: SuppressionFranceConnect = {
    doitSeDeconnecterDeFranceConnect: false,
    urlDeDeconnexion: '',
  };

  constructor(franceConnect?: SuppressionFranceConnect) {
    this.franceConnect = franceConnect || this.franceConnect;
  }

  private _mettreAJourLeMotDePasseArgs?: { idUtilisateur: string; nouveauMotDePasse: string };

  get mettreAJourLeMotDePasseArgs(): { idUtilisateur: string; nouveauMotDePasse: string } | undefined {
    return this._mettreAJourLeMotDePasseArgs;
  }

  static utilisateurFranceConnect(): CompteUtilisateurRepositoryMock {
    return new CompteUtilisateurRepositoryMock({
      doitSeDeconnecterDeFranceConnect: true,
      urlDeDeconnexion: 'urlDeDeconnexion',
    });
  }

  creerCompteUtilisateur(compteUtilisateurACreer): Promise<CompteUtilisateur> {
    return Promise.resolve({
      id: 'id',
      nom: compteUtilisateurACreer.nom,
      mail: compteUtilisateurACreer.email,
      codePostal: '',
      commune: '',
      prenom: compteUtilisateurACreer.prenom,
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    return Promise.resolve({
      nom: 'Doe',
      id: '1',
      mail: 'mail@exemple.com',
      prenom: 'John',
      fonctionnalitesDebloquees: [],
    });
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<SuppressionFranceConnect> {
    return Promise.resolve(this.franceConnect);
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    this._mettreAJourLeMotDePasseArgs = { idUtilisateur, nouveauMotDePasse };
    return Promise.resolve();
  }

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    return Promise.resolve();
  }
}
