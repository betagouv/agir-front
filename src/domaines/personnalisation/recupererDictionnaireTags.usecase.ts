import { AfficherDictionnaireTagsPresenter } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';
import { PersonnalisationRepository } from '@/domaines/personnalisation/ports/personnalisation.repository';

export class RecupererDictionnaireTagsUsecase {
  constructor(
    private personnalisationRepository: PersonnalisationRepository,
    private afficherMappingTagKYCPresenter: AfficherDictionnaireTagsPresenter,
  ) {}

  async execute(): Promise<void> {
    const dictionnaireTags = await this.personnalisationRepository.recupererDictionnaireTags();
    this.afficherMappingTagKYCPresenter.presente(dictionnaireTags);
  }
}
