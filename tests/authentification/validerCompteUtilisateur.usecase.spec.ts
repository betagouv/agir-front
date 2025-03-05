import { ValiderCompteUtilisateurUsecase } from '@/domaines/authentification/validerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { UtilisateurRepositoryMock } from './adapters/utilisateur.repository.mock';

describe('Fichier de tests concernant la validation du compte utilisateur', () => {
  it('En donnant un mail et un code doit valider le compte puis le sauvegarder en session', async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new ValiderCompteUtilisateurUsecase(
      UtilisateurRepositoryMock.nouvelleInstance(),
      spySessionRepository,
    );
    await usecase.execute('john@exemple.com', '123456');
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: 'utilisateurId',
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: 'token',
      pseudo: '',
    });
  });
});
