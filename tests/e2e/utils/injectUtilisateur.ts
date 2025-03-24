import { UtilisateurStore } from '@/store/utilisateur';

export class InjectUtilisateur {
  public avecUtilisateurPremiereConnexion(): UtilisateurStore {
    return {
      utilisateur: {
        id: 'dorian',
        nom: 'RECETTEUR',
        prenom: 'Dorian',
        mail: 'dorian@agir.dev',
        onboardingAEteRealise: true,
        afficherDisclaimerAides: false,
        pseudo: 'dorian',
        estUnUtilisateurFranceConnect: false,
        afficherMessageReset: false,
      },
      score: {
        points: 0,
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
