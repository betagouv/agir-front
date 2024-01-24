import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { LinkyPresenter } from './ports/linky.presenter';

export interface ConsommationElectrique {
  date: Date;
  valeur_kWh: number;
  valeur_kWh_ajustée_temperature: number;
}

export class ObtenirConsommationElectriqueUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(
    idUtilsateur: string,
    frequence: 'jour' | 'semaine' | 'mois' | 'annee',
    nombreOccurence: number,
    presenter: LinkyPresenter
  ) {
    const response = await this.linkyRepository.recupererConsommationElectrique(
      idUtilsateur,
      frequence,
      nombreOccurence
    );

    presenter.presente(response);
  }
}
