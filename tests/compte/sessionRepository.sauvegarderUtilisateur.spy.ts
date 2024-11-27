import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export class SpySauvegarderUtilisateurSessionRepository implements SessionRepository {
  private _utilisateur: Utilisateur = {
    id: '',
    mail: '',
    prenom: '',
    nom: '',
    onboardingAEteRealise: false,
    afficherDisclaimerAides: false,
  };

  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  static avecOnBoardingRealise(utilisateur?: Partial<Utilisateur>): SpySauvegarderUtilisateurSessionRepository {
    const repository = new SpySauvegarderUtilisateurSessionRepository();
    repository.sauvegarderUtilisateur({ onboardingAEteRealise: true, ...utilisateur });
    return repository;
  }

  static sansOnBoardingRealise(): SpySauvegarderUtilisateurSessionRepository {
    const repository = new SpySauvegarderUtilisateurSessionRepository();
    repository.sauvegarderUtilisateur({ onboardingAEteRealise: false });
    return repository;
  }

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>) {
    this._utilisateur = {
      ...this._utilisateur,
      ...utilisateur,
    };
  }

  sauvegarderScore(score: Score): void {}
}
