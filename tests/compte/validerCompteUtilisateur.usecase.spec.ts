import { ValiderCompteUtilisateurUsecase } from '../../src/compte/validerCompteUtilisateur.usecase';
import { SessionRepository } from '../../src/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '../../src/authentification/ports/utilisateur.repository';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '../../src/compte/ports/compteUtilisateur.repository';

class SpySessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  private _utilisateur: Utilisateur = { id: '', nom: '', codePostal: '', prenom: '', mail: '', revenuFiscal: '' };

  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }
}

class SpyValiderCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get compteUtilisateur(): CompteUtilisateur {
    return this._compteUtilisateur;
  }
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
    throw Error();
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

  validerCompteUtilisateur(email: string, code: string): Promise<CompteUtilisateur> {
    return Promise.resolve({ ...this._compteUtilisateur, mail: email });
  }
}
describe('Fichier de tests concernant la validation du compte utilisateur', () => {
  it('En donnant un mail et un code doit valider le compte', async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = new SpySessionRepository();
    const usecase = new ValiderCompteUtilisateurUsecase(
      new SpyValiderCompteUtilisateurRepository(),
      spySessionRepository
    );
    await usecase.execute('john@exemple.com', '123456');
    // THEN
    expect(spySessionRepository.utilisateur).toEqual({
      id: '',
      nom: '',
      codePostal: '',
      prenom: '',
      mail: 'john@exemple.com',
      revenuFiscal: '',
    });
  });
});
