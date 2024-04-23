import {
  CompteUtilisateurPresenterImpl,
  CompteUtlisateurViewModel,
} from '@/compte/adapters/compteUtilisateur.presenter.impl';
import { ChargerCompteUtilisateurUsecase } from '@/compte/chargerCompteUtilisateur.usecase';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { expect } from 'vitest';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { PublierEvenementRepositorySpy } from '../shell/publierEvenement.repository.spy';
import { Evenemement } from '@/shell/ports/publierEvenement.repository';

class ChargeCompteUtilisateurAvecMailRepository implements CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    return Promise.resolve({
      nom: 'Doe',
      id: '1',
      mail: 'mail@exemple.com',
      prenom: 'John',
      fonctionnalitesDebloquees: [],
    });
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }
}

describe('Fichier de tests concernant le chargement du compte utilisateur', () => {
  it("Doit aller chercher les infos à partir de l'utilisateurId", async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const spyPublierEvenement = new PublierEvenementRepositorySpy();
    // WHEN
    const usecase = new ChargerCompteUtilisateurUsecase(
      new ChargeCompteUtilisateurAvecMailRepository(),
      spySessionRepository,
    );
    await usecase.execute('1', new CompteUtilisateurPresenterImpl(expectation));
    // THEN
    function expectation(compteUtilisateurViewModel: CompteUtlisateurViewModel) {
      expect(compteUtilisateurViewModel).toStrictEqual<CompteUtlisateurViewModel>({
        id: '1',
        nom: 'Doe',
        mail: 'mail@exemple.com',
        prenom: 'John',
        fonctionnalitesDebloquees: [],
      });
    }
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Doe',
      mail: 'mail@exemple.com',
      prenom: 'John',
      fonctionnalitesDebloquees: [],
    });
  });
});
