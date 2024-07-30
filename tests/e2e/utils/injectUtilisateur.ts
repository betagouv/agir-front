import { UtilisateurStore } from '@/store/utilisateur';

export class InjectUtilisateur {
  public avecUtilisateur(utilisateur: UtilisateurStore): UtilisateurStore {
    return utilisateur;
  }

  public avecUtilisateurPremiereConnexion(): UtilisateurStore {
    return {
      utilisateur: {
        id: 'dorian',
        nom: 'RECETTEUR',
        prenom: 'Dorian',
        mail: 'dorian@agir.dev',
        fonctionnalitesDebloquees: [],
        onboardingAEteRealise: true,
      },
      valeurBilanCarbone: { bilan: '', details: [], valeurMax: 0 },
      score: {
        points: 10,
        niveau: 1,
        nombreDePointsDansLeNiveau: 10,
        nombreDePointsDuNiveau: 100,
      },
      tracking: {
        matomoEstInactif: true,
      },
      disclaimer: {
        afficherDisclaimerGeneral: false,
      },
    };
  }
}
