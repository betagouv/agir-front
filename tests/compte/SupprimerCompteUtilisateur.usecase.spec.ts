import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '../../src/compte/ports/compteUtilisateur.repository';
import { SupprimerCompteUtilisateurUsecase } from '../../src/compte/supprimerCompteUtilisateur.usecase';

class SypCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get idUtilisateur(): string {
    return this._idUtilisateur;
  }
  private _idUtilisateur: string = '';
  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }
  private _aEteAppelee: boolean = false;
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error();
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {
    throw Error();
  }

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error();
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    this._aEteAppelee = true;
    this._idUtilisateur = idUtilisateur;
    return Promise.resolve();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }

  validerCompteUtilisateur(email: string, code: string): Promise<CompteUtilisateur> {
    throw Error();
  }
}

describe('Fichier de tests concernant la suppression du compte utilisateur', () => {
  it('La suppression doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const repository = new SypCompteUtilisateurRepository();
    const usecase = new SupprimerCompteUtilisateurUsecase(repository);
    usecase.execute('utlisateurId');
    // THEN
    expect(repository.aEteAppelee).toBeTruthy();
    expect(repository.idUtilisateur).toStrictEqual('utlisateurId');
  });
});
