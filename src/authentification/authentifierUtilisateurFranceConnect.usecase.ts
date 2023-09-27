import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import jwt_decode from 'jwt-decode';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Utilisateur);
}
export class AuthentifierUtilisateurFranceConnectUsecase {
  private _utilisateurRepository: UtilisateurRepository;
  private _sessionRepository: SessionRepository;
  constructor(utilisateurRepository: UtilisateurRepository, sessionRepository: SessionRepository) {
    this._utilisateurRepository = utilisateurRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(token: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const utilisateurId = jwt_decode(token).utilisateurId as string;
    const utilisateur = await this._utilisateurRepository.getUtilisateurAvecId(utilisateurId);
    this._sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
