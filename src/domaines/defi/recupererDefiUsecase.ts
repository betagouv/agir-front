import { DefiPresenter } from '@/domaines/defi/ports/defi.presenter';
import { DefiRepository } from '@/domaines/defi/ports/defi.repository';

export class RecupererDefiUsecase {
  constructor(private readonly defiRepository: DefiRepository) {}

  async execute(defiId: string, utilisateurId: string, defiPresenter: DefiPresenter): Promise<void> {
    const question = await this.defiRepository.recupererDefi(defiId, utilisateurId);
    defiPresenter.presente(question);
  }
}
