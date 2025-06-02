import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { AppRawDataStorage } from '@/shell/appRawDataStorage';

export class PatcherInformationLogementUsecase {
  constructor(
    private readonly logementRepository: LogementRepository,
    private readonly appRawDataStorage: AppRawDataStorage,
  ) {}

  async execute(idUtilisateur: string, logement: Partial<Logement>): Promise<void> {
    await this.logementRepository.patcherLesInformations(idUtilisateur, logement);
    this.appRawDataStorage.clearAllItems();
  }
}
