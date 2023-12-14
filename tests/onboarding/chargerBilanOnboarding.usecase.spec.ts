import {
  BilanOnboardingUtilisateur,
  Utilisateur,
  UtilisateurRepository,
} from '@/authentification/ports/utilisateur.repository';
import {
  OnboardingBilanPresenterImpl,
  OnboardingBilanViewModel,
} from '@/onboarding/adapters/onboardingBilan.presenter.impl';
import { ChargerBilanOnboardingUsecase } from '@/onboarding/chargerBilanOnboarding.usecase';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      codePostal: '77650',
      commune: 'NOM COMMUNE',
      prenom: 'John',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur> {
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

  recupererBilanOnboarding(utilisateurId: string): Promise<BilanOnboardingUtilisateur> {
    return Promise.resolve<BilanOnboardingUtilisateur>({
      alimentation: 2,
      transports: 3,
      logement: 1,
      consommation: 4,
    });
  }
}

describe("Fichier de tests concernant la récupération du bilan de l'onboarding", () => {
  it("En donnant l'id d'un utilisateur doit presenter un resultat trié par valeur décroissante", async () => {
    // GIVEN

    // WHEN THEN
    const usecase = new ChargerBilanOnboardingUsecase(new UtilisateurRepositoryForTest());
    await usecase.execute(
      'utilisateurId',
      new OnboardingBilanPresenterImpl(resultat => {
        expect(resultat.resultat).toStrictEqual<OnboardingBilanViewModel['resultat']>([
          {
            libelle: '🛒 Consommation',
            valeur: 4,
          },
          {
            libelle: '🚗 Transports',
            valeur: 3,
          },
          {
            libelle: '🥦 Alimentation',
            valeur: 2,
          },
          {
            libelle: '🏡 Logement',
            valeur: 1,
          },
        ]);
      })
    );
  });
});
