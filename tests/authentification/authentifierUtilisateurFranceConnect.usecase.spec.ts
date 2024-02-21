import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { IdUtilisateur, Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { AuthentifierUtilisateurFranceConnectUsecase } from '@/authentification/authentifierUtilisateurFranceConnect.usecase';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  get idUtilisateur(): string {
    return this._idUtilisateur;
  }

  private _idUtilisateur: string = '';

  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    this._idUtilisateur = idUtilisateur;
    return Promise.resolve({
      id: '4df5cd01-ae3e-46fa-99d4-9c18f696b6ba',
      nom: 'DUBOIS',
      codePostal: '75001',
      commune: 'PARIS 01',
      prenom: 'John',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  }

  validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
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
}

describe("Fichier de tests concernant l'authentification France Connect", () => {
  it("Lorsque je passe un token doit sauvegarder le nom et l'id", async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const utilisateurRepositoryForTest = new UtilisateurRepositoryForTest();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(utilisateurRepositoryForTest, spySessionRepository);
    // WHEN
    await usecase.execute(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cklkIjoiNGRmNWNkMDEtYWUzZS00NmZhLTk5ZDQtOWMxOGY2OTZiNmJhIiwiaWF0IjoxNjkyMjU5MjI0LCJleHAiOjE2OTIyNTkyODR9.6Qm_REdedxvT5D8ppqtG7igcizs1OkbAD610kulRgWU'
    );
    // THEN
    expect(utilisateurRepositoryForTest.idUtilisateur).toStrictEqual('4df5cd01-ae3e-46fa-99d4-9c18f696b6ba');
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '4df5cd01-ae3e-46fa-99d4-9c18f696b6ba',
      nom: 'DUBOIS',
      codePostal: '75001',
      commune: 'PARIS 01',
      prenom: 'John',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  });
});
