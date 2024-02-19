import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export class ObtenirConsommationElectriqueDerniersJoursUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const response = await this.linkyRepository.recupererConsommationElectriqueDerniersJours(idUtilsateur);
    presenter.presente(response);
  }
}
