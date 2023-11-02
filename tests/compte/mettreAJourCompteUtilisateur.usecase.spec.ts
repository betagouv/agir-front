import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';
import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';

class SpyCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get compteUtilisateur(): CompteUtilisateur {
    return {
      id: this._compteUtilisateur.id,
      nom: this._compteUtilisateur.nom,
      mail: this._compteUtilisateur.mail,
      codePostal: this._compteUtilisateur.codePostal,
      prenom: this._compteUtilisateur.prenom,
      revenuFiscal: 10000,
    };
  }

  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }

  private _aEteAppelee: boolean = false;

  private _compteUtilisateur: CompteUtlisateurViewModel = {
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
    this._compteUtilisateur = {
      id: compteUtilisateur.id,
      nom: compteUtilisateur.nom,
      mail: compteUtilisateur.mail,
      codePostal: compteUtilisateur.codePostal,
      prenom: compteUtilisateur.prenom,
      revenuFiscal: compteUtilisateur.revenuFiscal ? compteUtilisateur.revenuFiscal.toString() : '',
    };
  }

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error();
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
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
    const repository = new SpyCompteUtilisateurRepository();
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
      revenuFiscal: 10000,
    });
    expect(sessionRepository.utlisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: 10000,
    });
  });
});
