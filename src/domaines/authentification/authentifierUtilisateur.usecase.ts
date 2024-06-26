import { Utilisateur, UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;
  nouvelleFeatureDebloquee(featureDebloquee: string): void;
  sauvegarderScore(score: Score): void;
}
export class AuthentifierUtilisateurUsecase {
  private _utilisateurRepository: UtilisateurRepository;
  private _sessionRepository: SessionRepository;
  constructor(utilisateurRepository: UtilisateurRepository, sessionRepository: SessionRepository) {
    this._utilisateurRepository = utilisateurRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(email: string, password: string): Promise<void> {
    const utilisateur = await this._utilisateurRepository.authentifierUtilisateur(email, password);
    this._sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
