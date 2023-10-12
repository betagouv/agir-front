import { CreerCompteUtilisateurUsecase } from '../../src/compte/creerCompteUtilisateur.usecase';
import { SessionRepository } from '../../src/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '../../src/authentification/ports/utilisateur.repository';
import { CompteUtilisateur, CompteUtilisateurRepository } from '../../src/compte/ports/compteUtilisateur.repository';
import { OnboardingState } from '../../src/onboarding/evaluerOnboarding.usecase';

class SessionRepositoryForTest implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }
  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    codePostal: '',
    prenom: '',
    mail: '',
    revenuFiscal: '',
  };
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }
}

class CompteUtilisateurForTest implements CompteUtilisateurRepository {
  creerCompteUtilisateur(compteUtilisateurACreer): Promise<CompteUtilisateur> {
    return Promise.resolve({
      id: 'id',
      nom: compteUtilisateurACreer.nom,
      mail: compteUtilisateurACreer.email,
      codePostal: '',
      prenom: compteUtilisateurACreer.prenom,
      revenuFiscal: '',
    });
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }
}
describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte et le sauvegarder en session', async () => {
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
      id: 'id',
      nom: 'John',
      codePostal: '',
      prenom: 'Doe',
      mail: 'john@skynet.com',
      revenuFiscal: '',
    });
  });
});
