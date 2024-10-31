import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { CompteUtilisateur, CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';

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

describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte temporaire et sauvegarder uniquement le mail en session', async () => {
    // GIVEN
    const compteACreer: UserInput = {
      mail: 'john@skynet.com',
      motDePasse: 'motDePasse',
      situationId: 'situationId',
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
      afficherDisclaimerAides: false,
    });
  });
});
