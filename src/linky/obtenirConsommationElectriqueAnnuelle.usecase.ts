import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export interface ConsommationElectrique {
  commentaires: string[];
  data: {
    valeur: number;
    mois: string;
    annee: string;
    date: string;
  }[];
}

export class ObtenirConsommationElectriqueAnnuelleUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyPresenter) {
    const response = await this.linkyRepository.recupererConsommationElectriqueAnnuelle(idUtilsateur);
    presenter.presente(response);
  }
}
