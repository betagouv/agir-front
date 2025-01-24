import { CommuneRepository } from '@/domaines/communes/ports/commune.repository';

export class ChargementCommunesUsecase {
  constructor(private communeRepository: CommuneRepository) {}

  async execute(codePostal: string) {
    return this.communeRepository.getCommunes(codePostal);
  }
}
