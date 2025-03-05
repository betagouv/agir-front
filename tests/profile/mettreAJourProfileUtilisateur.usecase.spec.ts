import {
  MettreAJourProfileUtilisateurUsecase,
  ProfileAMettreAJourInput,
} from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';
import {
  ProfileUtilisateur,
  ProfileUtilisateurAMettreAJour,
  ProfileUtilisateurFranceConnectAMettreAJour,
} from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

class SpyProfileUtilisateurRepository implements ProfileUtilisateurRepository {
  private _mettreAjourUtilisateurFranceConnecteArgs: ProfileUtilisateurFranceConnectAMettreAJour = {
    id: '',
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    abonnementTransport: false,
    anneeNaissance: 1998,
    pseudo: '',
  };

  get mettreAjourUtilisateurFranceConnecteArgs(): ProfileUtilisateurFranceConnectAMettreAJour {
    return this._mettreAjourUtilisateurFranceConnecteArgs;
  }

  private _profileUtilisateuraMettreAJourArgs: ProfileUtilisateurAMettreAJour = {
    id: '',
    nom: '',
    prenom: '',
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    abonnementTransport: false,
    anneeNaissance: -1,
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

  mettreAjourUtilisateurFranceConnecte(profileUtilisateur: ProfileUtilisateurFranceConnectAMettreAJour): Promise<void> {
    this._mettreAjourUtilisateurFranceConnecteArgs = profileUtilisateur;
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
    const viewModelInput: ProfileAMettreAJourInput = {
      id: '1',
      nom: 'Dorian',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      pseudo: 'JD',
      nomPrenomModifiables: true,
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
  it('Cas de France Connect : le nom et prenom ne peuvent pas être mis à jour et la mise à jour doit appeler le repository et mettre à jour la session', async () => {
    // GIVEN
    // WHEN
    const repository = new SpyProfileUtilisateurRepository();
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      mail: 'mail@exemple.com',
      pseudo: 'JD',
    });
    const usecase = new MettreAJourProfileUtilisateurUsecase(repository, sessionRepository);
    const viewModelInput: ProfileAMettreAJourInput = {
      id: '1',
      nom: 'Dorian',
      prenom: 'John',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      pseudo: 'nouveauPseudo',
      nomPrenomModifiables: false,
    };
    await usecase.execute(viewModelInput);
    // THEN
    expect(
      repository.mettreAjourUtilisateurFranceConnecteArgs,
    ).toStrictEqual<ProfileUtilisateurFranceConnectAMettreAJour>({
      id: '1',
      revenuFiscal: 10000,
      nombreDePartsFiscales: 1,
      abonnementTransport: false,
      anneeNaissance: undefined,
      pseudo: 'nouveauPseudo',
    });
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Dorian',
      mail: 'mail@exemple.com',
      prenom: 'John',
      onboardingAEteRealise: true,
      afficherDisclaimerAides: false,
      pseudo: 'nouveauPseudo',
    });
  });
});
