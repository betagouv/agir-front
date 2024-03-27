import { jwtDecode } from 'jwt-decode';
import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

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
    const utilisateurId = jwtDecode(token).utilisateurId as string;
    const utilisateur = await this._utilisateurRepository.getUtilisateurAvecId(utilisateurId);
    this._sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
