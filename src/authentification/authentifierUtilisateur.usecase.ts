import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;
  nouvelleFeatureDebloquee(featureDebloquee: string): void;
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
