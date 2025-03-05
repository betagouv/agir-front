import {
  CompteUtilisateurPresenterImpl,
  CompteUtlisateurViewModel,
} from '@/domaines/compte/adapters/compteUtilisateur.presenter.impl';
import { ChargerCompteUtilisateurUsecase } from '@/domaines/compte/chargerCompteUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { expect } from 'vitest';
import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';

describe('Fichier de tests concernant le chargement du compte utilisateur', () => {
  it("Doit aller chercher les infos à partir de l'utilisateurId", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    // WHEN
    const usecase = new ChargerCompteUtilisateurUsecase(new CompteUtilisateurRepositoryMock(), spySessionRepository);
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
      onboardingAEteRealise: true,
      afficherDisclaimerAides: false,
      pseudo: 'JD',
    });
  });
});
