import { UniversPresenter } from '@/domaines/univers/ports/univers.presenter';
import { UniversRepository } from '@/domaines/univers/ports/univers.repository';

export class RecupererUniversUsecase {
  constructor(private readonly universRepository: UniversRepository) {}

  async execute(utilisateurId: string, universId: string, universPresenter: UniversPresenter): Promise<void> {
    const univers = await this.universRepository.recupererUnivers(utilisateurId, universId);
    universPresenter.present(univers);
  }
}
