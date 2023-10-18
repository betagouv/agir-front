import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';

export class ValiderCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateurRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository
  ) {}

  public async execute(email: string, code: string) {
    const utilisateur = await this.compteUtilisateurRepository.validerCompteUtilisateur(email, code);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
  }
}
