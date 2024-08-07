import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/domaines/compte/ports/compteUtilisateur.repository';
import { SupprimerCompteUtilisateurUsecase } from '@/domaines/compte/supprimerCompteUtilisateur.usecase';

class SpyCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get idUtilisateur(): string {
    return this._idUtilisateur;
  }
  private _idUtilisateur: string = '';
  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }
  private _aEteAppelee: boolean = false;
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    this._aEteAppelee = true;
    this._idUtilisateur = idUtilisateur;
    return Promise.resolve();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error;
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

describe('Fichier de tests concernant la suppression du compte utilisateur', () => {
  it('La suppression doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const repository = new SpyCompteUtilisateurRepository();
    const usecase = new SupprimerCompteUtilisateurUsecase(repository);
    usecase.execute('utlisateurId');
    // THEN
    expect(repository.aEteAppelee).toBeTruthy();
    expect(repository.idUtilisateur).toStrictEqual('utlisateurId');
  });
});
