import { CommuneRepository } from '@/domaines/communes/ports/communeRepository';

export class ChargementCommunesUsecase {
  constructor(private communeRepository: CommuneRepository) {}

  async execute(codePostal: string) {
    return this.communeRepository.getCommunes(codePostal);
  }
}
