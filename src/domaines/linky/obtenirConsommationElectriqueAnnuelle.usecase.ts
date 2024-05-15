import { LinkyPresenter } from '@/domaines/linky/ports/linky.presenter';
import { LinkyRepository } from '@/domaines/linky/ports/linkyRepository.repository';

export class ObtenirConsommationElectriqueAnnuelleUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const consommationElectriqueAnnuelle =
      await this.linkyRepository.recupererConsommationElectriqueAnnuelle(idUtilsateur);
    presenter.presente(consommationElectriqueAnnuelle);
  }
}
