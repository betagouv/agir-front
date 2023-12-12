import { CreerCompteUtilisateurUsecase } from '@/compte/creerCompteUtilisateur.usecase';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { CompteUtilisateur, CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';

class SessionRepositoryForTest implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }
  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    codePostal: '',
    commune: '',
    prenom: '',
    mail: '',
    revenuFiscal: null,
    nombreDePartsFiscales: 1,
    abonnementTransport: false,
    fonctionnalitesDebloquees: [],
  };
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }

  nouvelleFeatureDebloquee(featureDebloquee: string): void {}
}

class CompteUtilisateurForTest implements CompteUtilisateurRepository {
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
    });
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }
}
describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte temporaire et sauvegarder uniquement le mail en session', async () => {
    // GIVEN
    const compteACreer = {
      nom: 'John',
      id: '',
      mail: 'john@skynet.com',
      codePostal: '',
      prenom: 'Doe',
      revenuFiscal: '',
      motDePasse: 'motDePasse',
    };

    const onboardingState: OnboardingState = {
      etapeTransport: {
        transports: [],
        avion: 0,
        done: true,
      },
      etapeLogement: {
        code_postal: '',
        commune: '',
        adultes: 0,
        enfants: 0,
        residence: '',
        proprietaire: false,
        superficie: '',
        chauffage: '',
        done: true,
      },
      etapeAlimentation: {
        repas: '',
        done: true,
      },
      etapeConsommation: {
        consommation: '',
        done: true,
      },
    };
    const sessionRepository = new SessionRepositoryForTest();
    const compteUtilisateurRepository = new CompteUtilisateurForTest();
    // WHEN
    const usecase = new CreerCompteUtilisateurUsecase(compteUtilisateurRepository, sessionRepository);
    await usecase.execute(compteACreer, onboardingState);
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '',
      nom: '',
      codePostal: '',
      commune: '',
      prenom: '',
      mail: 'john@skynet.com',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  });
});
