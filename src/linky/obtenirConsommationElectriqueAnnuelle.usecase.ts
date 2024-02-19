import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export class ObtenirConsommationElectriqueAnnuelleUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const response = await this.linkyRepository.recupererConsommationElectriqueAnnuelle(idUtilsateur);
    presenter.presente(response);
  }
}
