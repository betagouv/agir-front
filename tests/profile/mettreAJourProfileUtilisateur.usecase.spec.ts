import {
  MettreAJourProfileUtilisateurUsecase,
  ProfileAMettreAJour,
} from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';
import {
  ProfileUtilisateur,
  ProfileUtilisateurAMettreAJour,
} from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

class SpyProfileUtilisateurRepository implements ProfileUtilisateurRepository {
  private _profileUtilisateuraMettreAJourArgs: ProfileUtilisateurAMettreAJour = {
    id: '',
    nom: '',
    prenom: '',
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    abonnementTransport: false,
    anneeNaissance: 1998,
    pseudo: '',
  };

  get profileUtilisateuraMettreAJourArgs(): ProfileUtilisateurAMettreAJour {
    return this._profileUtilisateuraMettreAJourArgs;
  }

  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur> {
    throw new Error('Method not implemented.');
  }

  mettreAjour(profileUtilisateur: ProfileUtilisateurAMettreAJour): Promise<void> {
    this._profileUtilisateuraMettreAJourArgs = profileUtilisateur;
    return Promise.resolve();
  }
}

describe('Fichier de tests concernant la mise à jour du profile utilisateur', () => {
  it('La mise à jour doit appeler le repository et mettre à jour la session', async () => {
    // GIVEN
    // WHEN
    const repository = new SpyProfileUtilisateurRepository();
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      mail: 'mail@exemple.com',
      pseudo: 'JD',
    });
    const usecase = new MettreAJourProfileUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: ProfileAMettreAJour = {
      id: '1',
      nom: 'Dorian',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      pseudo: 'JD',
    };
    await usecase.execute(viewModelInput);
    // THEN
    expect(repository.profileUtilisateuraMettreAJourArgs).toStrictEqual<ProfileUtilisateurAMettreAJour>({
      id: '1',
      nom: 'Dorian',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      anneeNaissance: undefined,
      pseudo: 'JD',
    });
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      onboardingAEteRealise: true,
      afficherDisclaimerAides: false,
      pseudo: 'JD',
    });
  });
});
