import { LinkyPresenter } from '@/linky/ports/linky.presenter';
import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';

export class ObtenirConsommationElectriqueQuatorzeJoursUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const response = await this.linkyRepository.recupererConsommationElectriqueQuatorzeJours(idUtilsateur);
    presenter.presente(response);
  }
}
