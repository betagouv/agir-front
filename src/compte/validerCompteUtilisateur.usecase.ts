import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

export class ValiderCompteUtilisateurUsecase {
  constructor(private utilisateurRepository: UtilisateurRepository, private sessionRepository: SessionRepository) {}

  public async execute(email: string, code: string) {
    const utilisateur = await this.utilisateurRepository.validerCompteUtilisateur(email, code);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
