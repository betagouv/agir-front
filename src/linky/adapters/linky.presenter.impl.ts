import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { LinkyPresenter } from '@/linky/ports/linky.presenter';

export interface ConsommationElectriqueViewModel {
  libelles: string[];
  valeur_courante: number[];
  valeur_precedente: number[];
}

export class LinkyPresenterImpl implements LinkyPresenter {
  constructor(private viewModel: (consommationElectriqueViewModel: ConsommationElectriqueViewModel) => void) {}

  presente(consommationElectrique: ConsommationElectrique[]): void {
    const consommationElectriqueViewModel: ConsommationElectriqueViewModel = {
      libelles: [],
      valeur_courante: [],
      valeur_precedente: [],
    };

    consommationElectrique.forEach((consommation, index) => {
      if (index % 2 === 0) {
        consommationElectriqueViewModel.libelles.push(consommation.mois);
        consommationElectriqueViewModel.valeur_courante.push(consommation.valeur);
      } else {
        consommationElectriqueViewModel.valeur_precedente.push(consommation.valeur);
      }
    });

    this.viewModel(consommationElectriqueViewModel);
  }
}
