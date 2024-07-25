import { SpySauvegarderUtilisateurSessionRepository } from './sessionRepository.sauvegarderUtilisateur.spy';
import { expect } from 'vitest';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/domaines/compte/ports/compteUtilisateur.repository';
import { Error } from 'lighthouse/core/lib/lantern/lantern';
import { ValiderOnboardingPostCreationCompteUsecase } from '@/domaines/compte/validerOnboardingPostCreationCompte.usecase';

class ValidationOnboardingCompteUtilisateurRepository implements CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error;
  }

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    return Promise.resolve();
  }
}

describe("Fichier de tests concernant la validation de l'onboarding après creation de connexion", () => {
  it('Quand je termine mon onbarding, ma session est à jour avec mon prenom et onboardingAEteRealise doit être vrai ', async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const compteUtilisateuRepositoy = new ValidationOnboardingCompteUtilisateurRepository();
    const usecase = new ValiderOnboardingPostCreationCompteUsecase(compteUtilisateuRepositoy, spySessionRepository);
    // WHEN
    await usecase.execute('1', {
      prenom: 'Dorian',
      commune: 'Paris',
      codePostal: '75000',
    });
    // THEN
    expect(spySessionRepository.utilisateur.prenom).toBe('Dorian');
    expect(spySessionRepository.utilisateur.onboardingAEteRealise).toBe(true);
  });
});
