import { PersonnalisationRepository } from '@/domaines/personnalisation/ports/personnalisation.repository';

export class RecupererTousLesTagsPersonnalisation {
  constructor(private personnalisationRepository: PersonnalisationRepository) {}

  async execute(): Promise<string[]> {
    return await this.personnalisationRepository.recupererTagsPersonnalisation();
  }
}
