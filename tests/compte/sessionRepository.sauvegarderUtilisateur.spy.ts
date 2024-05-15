import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export class SpySauvegarderUtilisateurSessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    prenom: '',
    mail: '',
    fonctionnalitesDebloquees: [],
  };

  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = {
      ...this._utilisateur,
      ...utilisateur,
    };
  }

  nouvelleFeatureDebloquee(featureDebloquee: string): void {}
}
