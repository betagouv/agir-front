import { CompteUtlisateurViewModel } from '../../src/compte/adapters/compteUtilisateur.presenter.impl';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '../../src/compte/ports/compteUtilisateur.repository';
import { MettreAJourCompteUtilisateurUsecase } from '../../src/compte/mettreAJourCompteUtilisateur.usecase';
import { SessionRepository } from '../../src/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '../../src/authentification/ports/utilisateur.repository';

class SypCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get compteUtilisateur(): CompteUtilisateur {
    return this._compteUtilisateur;
  }
  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }
  private _aEteAppelee: boolean = false;
  private _compteUtilisateur: CompteUtilisateur = {
    id: '',
    nom: '',
    mail: '',
    codePostal: '',
    prenom: '',
    revenuFiscal: '',
  };
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error();
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {
    this._aEteAppelee = true;
    this._compteUtilisateur = compteUtilisateur;
  }

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error();
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }
}
class SpySessionRepository implements SessionRepository {
  get utlisateur(): Utilisateur {
    return this._utlisateur!;
  }
  private _utlisateur: Utilisateur | null = null;
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utlisateur = utilisateur;
  }
}
describe('Fichier de tests concernant la mise à jour du compte utilisateur', () => {
  it('La mise à jour doit appeler le repository et mettre à jour la session', async () => {
    // GIVEN
    // WHEN
    const repository = new SypCompteUtilisateurRepository();
    const sessionRepository = new SpySessionRepository();
    const usecase = new MettreAJourCompteUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: CompteUtlisateurViewModel = {
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: '10000',
    };
    usecase.execute(viewModelInput);
    // THEN
    expect(repository.aEteAppelee).toBeTruthy();
    expect(repository.compteUtilisateur).toStrictEqual<CompteUtilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: '10000',
    });
    expect(repository.compteUtilisateur).toStrictEqual<CompteUtilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: '10000',
    });
    expect(sessionRepository.utlisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: '10000',
    });
  });
});
