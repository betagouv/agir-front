import { MettreAJourProfileUtilisateurUsecase } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { ProfileUtilisateurViewModel } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';
import { ProfileUtilisateur } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

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
    anneeNaissance: 1998,
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
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const usecase = new MettreAJourProfileUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: ProfileUtilisateurViewModel = {
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      anneeNaissance: '',
    };
    await usecase.execute(viewModelInput);
    // THEN
    expect(repository.profileUtilisateur).toStrictEqual<ProfileUtilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      anneeNaissance: undefined,
    });
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: true,
      afficherDisclaimerAides: false,
    });
  });
});
