import { CommuneRepository } from '@/domaines/communes/ports/communeRepository';

export class ChargementCommunesEPCIUsecase {
  constructor(private communeRepository: CommuneRepository) {}

  async execute(nom: string) {
    return this.communeRepository.getCommunesEPCI(nom);
  }
}
