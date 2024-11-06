import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class ValiderCompteUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  public async execute(email: string, code: string) {
    const utilisateurConnecte = await this.utilisateurRepository.validerCompteUtilisateur(email, code);
    this.sessionRepository.sauvegarderUtilisateur({
      id: utilisateurConnecte.id,
      token: utilisateurConnecte.token,
    });
    const utilisateur = await this.utilisateurRepository.getUtilisateurAvecId(utilisateurConnecte.id);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
