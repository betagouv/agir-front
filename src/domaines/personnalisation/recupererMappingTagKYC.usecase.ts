import { AfficherMappingTagKYCPresenter } from '@/domaines/personnalisation/ports/afficherMappingTagKYC.presenter';
import { PersonnalisationRepository } from '@/domaines/personnalisation/ports/personnalisation.repository';

export class RecupererMappingTagKYCUsecase {
  constructor(
    private personnalisationRepository: PersonnalisationRepository,
    private afficherMappingTagKYCPresenter: AfficherMappingTagKYCPresenter,
  ) {}

  async execute(): Promise<void> {
    const mappingsTagKYC = await this.personnalisationRepository.recupererMappingTagKYC();
    this.afficherMappingTagKYCPresenter.presente(mappingsTagKYC);
  }
}
