import { ValiderCompteUtilisateurUsecase } from '@/authentification/validerCompteUtilisateur.usecase';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { IdUtilisateur, Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';

class MockUtilisateurRepository implements UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur> {
    throw Error();
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve({
      id: idUtilisateur,
      nom: '',
      codePostal: '',
      commune: '',
      prenom: '',
      mail: 'john@exemple.com',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
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
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const usecase = new ValiderCompteUtilisateurUsecase(new MockUtilisateurRepository(), spySessionRepository);
    await usecase.execute('john@exemple.com', '123456');
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: 'utilisateurId',
      nom: '',
      codePostal: '',
      commune: '',
      prenom: '',
      mail: 'john@exemple.com',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  });
});
