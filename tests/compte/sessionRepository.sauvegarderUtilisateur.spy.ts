import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export class SpySauvegarderUtilisateurSessionRepository implements SessionRepository {
  private _utilisateur: Utilisateur = {
    id: '',
    mail: '',
    prenom: '',
    nom: '',
    fonctionnalitesDebloquees: [],
    onboardingAEteRealise: false,
    afficherDisclaimerAides: false,
  };

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

  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  get nouvelleFeatureDebloqueeAEteAppele(): boolean {
    return this._nouvelleFeatureDebloqueeAEteAppele;
  }

  get nouvelleFeatureDebloqueeArgs(): string {
    return this._nouvelleFeatureDebloqueeArgs;
  }

  private _nouvelleFeatureDebloqueeAEteAppele: boolean = false;
  private _nouvelleFeatureDebloqueeArgs: string = '';

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>) {
    this._utilisateur = {
      ...this._utilisateur,
      ...utilisateur,
    };
  }

  nouvelleFeatureDebloquee(featureDebloquee: string): void {
    this._nouvelleFeatureDebloqueeAEteAppele = true;
    this._nouvelleFeatureDebloqueeArgs = featureDebloquee;
  }

  sauvegarderScore(score: Score): void {}
}
