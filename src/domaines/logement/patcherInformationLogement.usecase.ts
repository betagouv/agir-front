import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export class PatcherInformationLogementUsecase {
  constructor(private readonly logementRepository: LogementRepository) {}

  async execute(idUtilisateur: string, logement: Partial<Logement>): Promise<void> {
    await this.logementRepository.patcherLesInformations(idUtilisateur, logement);
  }
}
