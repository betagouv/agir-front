import { Aide } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';

export class ConsulterAideEnModeNonConnecteUsecase {
  constructor(private readonly aideRepository: ChargementAidesRepository) {}

  async execute(idAide: string): Promise<Aide> {
    return this.aideRepository.consulterEnModeNonConnecte(idAide);
  }
}
