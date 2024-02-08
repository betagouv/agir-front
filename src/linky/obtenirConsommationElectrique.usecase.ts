import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export interface ConsommationElectrique {
  valeur: number;
  mois: string;
  annee: string;
}

export class ObtenirConsommationElectriqueUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const response = await this.linkyRepository.recupererConsommationElectrique(idUtilsateur);
    presenter.presente(response);
  }
}
