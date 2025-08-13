import { HistoriqueAdresseRepository } from '@/domaines/adresses/ports/historiqueAdresse.repository';

export class SupprimerHistoriqueAdresseUsecase {
  constructor(private readonly repository: HistoriqueAdresseRepository) {}

  async execute(idUtilisateur: string, idAdresseASupprimer: string): Promise<void> {
    await this.repository.supprimerAdresseHistorique(idUtilisateur, idAdresseASupprimer);
  }
}
