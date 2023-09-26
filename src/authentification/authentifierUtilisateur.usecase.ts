import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Utilisateur);
}
export class AuthentifierUtilisateurUsecase {
  private _utilisateurRepository: UtilisateurRepository;
  private _sessionRepository: SessionRepository;
  constructor(utilisateurRepository: UtilisateurRepository, sessionRepository: SessionRepository) {
    this._utilisateurRepository = utilisateurRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(nomUtilisateur: string): Promise<void> {
    const utilisateur = await this._utilisateurRepository.getUtilisateurAvecLeNom(nomUtilisateur);
    this._sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
