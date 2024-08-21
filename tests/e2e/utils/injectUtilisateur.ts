import { UtilisateurStore } from '@/store/utilisateur';

export class InjectUtilisateur {
  public avecUtilisateurPremiereConnexion(): UtilisateurStore {
    return {
      utilisateur: {
        id: 'dorian',
        nom: 'RECETTEUR',
        prenom: 'Dorian',
        mail: 'dorian@agir.dev',
        fonctionnalitesDebloquees: [],
        onboardingAEteRealise: true,
        afficherDisclaimerAides: false,
      },
      valeurBilanCarbone: { bilan: '', details: [], valeurMax: 0 },
      score: {
        points: 0,
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
