import { MettreAJourProfileUtilisateurUsecase } from '@/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { ProfileUtilisateurViewModel } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
import { ProfileUtilisateurRepository } from '@/profileUtilisateur/ports/profileUtilisateur.repository';
import { ProfileUtilisateur } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';

class SpyProfileUtilisateurRepository implements ProfileUtilisateurRepository {
  get profileUtilisateur(): ProfileUtilisateur {
    return this._profileUtilisateur;
  }
  private _profileUtilisateur: ProfileUtilisateur = {
    id: '',
    nom: '',
    prenom: '',
    mail: '',
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    abonnementTransport: false,
  };
  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur> {
    throw new Error('Method not implemented.');
  }
  mettreAjour(profileUtilisateur: ProfileUtilisateur) {
    this._profileUtilisateur = profileUtilisateur;
  }
}

describe('Fichier de tests concernant la mise à jour du profile utilisateur', () => {
  it('La mise à jour doit appeler le repository et mettre à jour la session', async () => {
    // GIVEN
    // WHEN
    const repository = new SpyProfileUtilisateurRepository();
    const sessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const usecase = new MettreAJourProfileUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: ProfileUtilisateurViewModel = {
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
    };
    usecase.execute(viewModelInput);
    // THEN
    expect(repository.profileUtilisateur).toStrictEqual<ProfileUtilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
    });
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      fonctionnalitesDebloquees: [],
    });
  });
});
