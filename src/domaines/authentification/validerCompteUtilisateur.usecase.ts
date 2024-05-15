import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class ValiderCompteUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  public async execute(email: string, code: string) {
    const idUtilisateur = await this.utilisateurRepository.validerCompteUtilisateur(email, code);
    const utilisateur = await this.utilisateurRepository.getUtilisateurAvecId(idUtilisateur);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
