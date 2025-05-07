import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { expect } from 'vitest';
import { ValiderOnboardingPostCreationCompteUsecase } from '@/domaines/compte/validerOnboardingPostCreationCompte.usecase';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';

describe("Fichier de tests concernant la validation de l'onboarding après creation de connexion", () => {
  it('Quand je termine mon onbarding, ma session est à jour avec mon prenom et onboardingAEteRealise doit être vrai ', async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const compteUtilisateuRepositoy = new CompteUtilisateurRepositoryMock();
    const usecase = new ValiderOnboardingPostCreationCompteUsecase(compteUtilisateuRepositoy, spySessionRepository);
    // WHEN
    await usecase.execute('1', {
      pseudo: 'Dorian',
      codeEpci: '75021',
      commune: 'Paris',
      codePostal: '75000',
      dateDeNaissance: {
        jour: '01',
        mois: '01',
        annee: '2000',
      },
    });
    // THEN
    expect(spySessionRepository.utilisateur.pseudo).toBe('Dorian');
    expect(spySessionRepository.utilisateur.onboardingAEteRealise).toBe(true);
  });
});
