import { ValiderCompteUtilisateurUsecase } from '@/domaines/authentification/validerCompteUtilisateur.usecase';
import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';

class MockUtilisateurRepository implements UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur> {
    throw Error();
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: idUtilisateur,
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
    });
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

  validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
    return Promise.resolve('utilisateurId');
  }
}
describe('Fichier de tests concernant la validation du compte utilisateur', () => {
  it('En donnant un mail et un code doit valider le compte puis le sauvegarder en session', async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new ValiderCompteUtilisateurUsecase(new MockUtilisateurRepository(), spySessionRepository);
    await usecase.execute('john@exemple.com', '123456');
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: 'utilisateurId',
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
    });
  });
});
