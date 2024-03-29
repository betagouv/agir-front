import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';
import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';

class SpyCompteUtilisateurRepository implements CompteUtilisateurRepository {
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
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    commune: '',
    abonnementTransport: false,
    fonctionnalitesDebloquees: [],
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

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }
}

describe('Fichier de tests concernant la mise à jour du compte utilisateur', () => {
  it('La mise à jour doit appeler le repository et mettre à jour la session', async () => {
    // GIVEN
    // WHEN
    const repository = new SpyCompteUtilisateurRepository();
    const sessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const usecase = new MettreAJourCompteUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: CompteUtlisateurViewModel = {
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75001',
      commune: 'PARIS 01',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    };
    usecase.execute(viewModelInput);
    // THEN
    expect(repository.aEteAppelee).toBeTruthy();
    expect(repository.compteUtilisateur).toStrictEqual<CompteUtilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75001',
      commune: 'PARIS 01',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      codePostal: '75001',
      commune: 'PARIS 01',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      fonctionnalitesDebloquees: [],
    });
  });
});
