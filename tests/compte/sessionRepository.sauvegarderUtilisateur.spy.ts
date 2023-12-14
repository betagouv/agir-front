import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';

export class SpySauvegarderUtilisateurSessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    codePostal: '',
    commune: '',
    prenom: '',
    mail: '',
    revenuFiscal: null,
    nombreDePartsFiscales: 1,
    abonnementTransport: false,
    fonctionnalitesDebloquees: [],
  };

  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }

  nouvelleFeatureDebloquee(featureDebloquee: string): void {}
}
