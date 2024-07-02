import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export class SpySauvegarderUtilisateurSessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  get nouvelleFeatureDebloqueeAEteAppele(): boolean {
    return this._nouvelleFeatureDebloqueeAEteAppele;
  }

  get nouvelleFeatureDebloqueeArgs(): string {
    return this._nouvelleFeatureDebloqueeArgs;
  }

  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    prenom: '',
    mail: '',
    fonctionnalitesDebloquees: [],
  };

  private _nouvelleFeatureDebloqueeAEteAppele: boolean = false;
  private _nouvelleFeatureDebloqueeArgs: string = '';

  sauvegarderUtilisateur(utilisateur: Utilisateur) {
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
