import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';
import { RefererRepositoryMock } from './adapters/referer.repository.mock';

describe('Fichier de tests concernant la creation du compte utilisateur', () => {
  it('doit creer un compte temporaire et sauvegarder uniquement le mail en session', async () => {
    // GIVEN
    const compteACreer: UserInput = {
      mail: 'john@skynet.com',
      situationId: 'situationId',
    };

    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const compteUtilisateurRepository = new CompteUtilisateurRepositoryMock();
    const refererRepository = new RefererRepositoryMock('monservice', 'keyword');
    const spyReinitialisation = vi.spyOn(refererRepository, 'reinitialiserLeReferer');

    // WHEN
    const usecase = new CreerCompteUtilisateurUsecase(
      compteUtilisateurRepository,
      sessionRepository,
      refererRepository,
    );

    await usecase.execute(
      new CreerComptePresenterImpl(viewModel => {
        expect(viewModel.route).toBe('validation-compte');
      }),
      compteACreer,
    );

    // THEN
    expect(refererRepository.recupererLeReferer()).toEqual({
      referer: 'monservice',
      refererKeyword: 'keyword',
    });

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

    expect(spyReinitialisation).toHaveBeenCalledOnce();
  });
});
