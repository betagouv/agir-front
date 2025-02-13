import { DeconnecterUtilisateurUsecase } from '@/domaines/authentification/deconnecterUtilisateur.usecase';
import { UtilisateurRepositorySpy } from './adapters/utilisateur.repository.spy';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { expect } from 'vitest';

describe("Fichier de tests concernant la déconnexion d'un compte utilisateur", () => {
  it("L'utilisateur est déconnecté du service et sa session est terminée", async () => {
    // GIVEN
    const utilisateurRepository = new UtilisateurRepositorySpy();
    const sessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise({
      id: 'id',
      mail: 'mail',
      prenom: 'prenom',
      nom: 'nom',
    });

    // WHEN
    const usecase = new DeconnecterUtilisateurUsecase(utilisateurRepository, sessionRepository);
    await usecase.execute('utilisateurId');

    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual({
      id: '',
      mail: '',
      prenom: '',
      nom: '',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
    });
    expect(utilisateurRepository.utilisateurAEteDeco).toBeTruthy();
  });
});
