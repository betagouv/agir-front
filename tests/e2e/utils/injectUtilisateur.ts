import { UtilisateurStore } from '../../../src/store/utilisateur';

export class InjectUtilisateur {
  public avecUtilisateur(utilisateur: UtilisateurStore): UtilisateurStore {
    return utilisateur;
  }

  public avecUtilisateurPremiereConnexion(): UtilisateurStore {
    return {
      utilisateur: {
        id: 'dorian',
        nom: 'RECETTEUR',
        codePostal: '21000',
        commune: 'DIJON',
        prenom: 'Dorian',
        mail: 'dorian@agir.dev',
        revenuFiscal: null,
        nombreDePartsFiscales: 2.5,
        fonctionnalitesDebloquees: [],
        abonnementTransport: false,
      },
      valeurBilanCarbone: { bilan: '', details: [], valeurMax: 0 },
      score: {
        points: 10,
        niveau: 1,
        nombreDePointsDansLeNiveau: 10,
        nombreDePointsDuNiveau: 100,
        celebration: null,
        afficherMissionsTermines: false,
      },
    };
  }
}
