import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { CompteUtilisateur, CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
import { RepositoryError } from '@/shell/repositoryError';

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
      fonctionnalitesDebloquees: [],
    });
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw new Error();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw new Error();
  }

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}

class CompteUtilisateurRepositoryErreurBetaFermee implements CompteUtilisateurRepository {
  creerCompteUtilisateur(compteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw new RepositoryError('023', 'message');
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw new Error();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw new Error();
  }

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}

describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte temporaire et sauvegarder uniquement le mail en session', async () => {
    // GIVEN
    const compteACreer: UserInput = {
      mail: 'john@skynet.com',
      motDePasse: 'motDePasse',
    };

    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const compteUtilisateurRepository = new CompteUtilisateurForTest();
    // WHEN
    const usecase = new CreerCompteUtilisateurUsecase(compteUtilisateurRepository, sessionRepository);
    await usecase.execute(
      new CreerComptePresenterImpl(viewModel => {
        expect(viewModel.route).toBe('validation-compte');
      }),
      compteACreer,
    );
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Partial<Utilisateur>>({
      fonctionnalitesDebloquees: [],
      id: '',
      mail: 'john@skynet.com',
      nom: '',
      prenom: '',
      onboardingAEteRealise: false,
    });
  });
  it("si le repository renvoie une erreur avec un code d'erreur 023 doit naviguer vers la page de beta fermée", async () => {
    // GIVEN
    const compteACreer: UserInput = {
      mail: 'john@skynet.com',
      motDePasse: 'motDePasse',
    };

    const sessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const compteUtilisateurRepository = new CompteUtilisateurRepositoryErreurBetaFermee();
    // WHEN // THEN
    const usecase = new CreerCompteUtilisateurUsecase(compteUtilisateurRepository, sessionRepository);
    await usecase.execute(
      new CreerComptePresenterImpl(viewModel => {
        expect(viewModel.route).toBe('beta-fermee');
      }),
      compteACreer,
    );
  });
});
