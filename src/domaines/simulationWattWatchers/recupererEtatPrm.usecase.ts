import { LogementRepository } from '@/domaines/logement/ports/logement.repository';

export interface EtatPrm {
  estPrmPresent: boolean;
  estPrmObsolete: boolean;
}

export class RecupererEtatPrmUsecase {
  constructor(private readonly repository: LogementRepository) {}

  async execute(utilisateurId: string): Promise<EtatPrm> {
    return await this.repository.recupererEtatPrm(utilisateurId);
  }
}
