import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';
import { RefererRepositoryStore } from '@/domaines/compte/adapters/referer.repository.store';

describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte temporaire et sauvegarder uniquement le mail en session', async () => {
    // GIVEN
    const compteACreer: UserInput = {
      mail: 'john@skynet.com',
      situationId: 'situationId',
    };

    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const compteUtilisateurRepository = new CompteUtilisateurRepositoryMock();
    // WHEN
    const usecase = new CreerCompteUtilisateurUsecase(
      compteUtilisateurRepository,
      sessionRepository,
      new RefererRepositoryStore(),
    );
    await usecase.execute(
      new CreerComptePresenterImpl(viewModel => {
        expect(viewModel.route).toBe('validation-compte');
      }),
      compteACreer,
    );
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Partial<Utilisateur>>({
      id: '',
      mail: 'john@skynet.com',
      nom: '',
      prenom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      pseudo: '',
      estUnUtilisateurFranceConnect: false,
      afficherMessageReset: false,
    });
  });
});
