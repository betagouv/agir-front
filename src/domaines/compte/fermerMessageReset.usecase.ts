import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export class FermerMessageResetUsecase {
  constructor(private readonly utilisateurRepository: UtilisateurRepository) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.utilisateurRepository.terminerMessageReset(idUtilisateur);
  }
}
