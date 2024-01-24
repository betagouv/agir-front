import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export interface ConsommationElectriqueViewModel {
  libelles: string[];
  valeur_kWh: number[];
  valeur_kWh_ajustée_temperature: number[];
}

export class LinkyPresenterImpl implements LinkyPresenter {
  constructor(private viewModel: (consommationElectriqueViewModel: ConsommationElectriqueViewModel) => void) {}

  presente(consommationElectrique: ConsommationElectrique[]): void {
    const consommationElectriqueViewModel: ConsommationElectriqueViewModel = {
      libelles: [],
      valeur_kWh: [],
      valeur_kWh_ajustée_temperature: [],
    };

    consommationElectrique.forEach(consommation => {
      consommationElectriqueViewModel.libelles.push(consommation.date.toString());
      consommationElectriqueViewModel.valeur_kWh.push(consommation.valeur_kWh);
      consommationElectriqueViewModel.valeur_kWh_ajustée_temperature.push(consommation.valeur_kWh_ajustée_temperature);
    });

    this.viewModel(consommationElectriqueViewModel);
  }
}
