import { Aide } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';

export class RecupererDetailAideUsecase {
  constructor(private readonly aideRepository: ChargementAidesRepository) {}

  async execute(idUtilisateur: string, idAide: string): Promise<Aide> {
    return this.aideRepository.recupererDetailAide(idUtilisateur, idAide);
  }
}
