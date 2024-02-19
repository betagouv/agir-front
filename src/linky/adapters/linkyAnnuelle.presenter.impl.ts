import { LinkyPresenter } from '@/linky/ports/linky.presenter';
import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export interface ConsommationElectriqueViewModel {
  commentaires: string[];
  graphique: {
    libelles: string[];
    valeur_courante: number[];
    valeur_precedente: number[];
  };
}

export class LinkyPresenterAnnuelleImpl implements LinkyPresenter {
  constructor(private viewModel: (consommationElectriqueViewModel: ConsommationElectriqueViewModel) => void) {}

  presente(consommationElectrique: ConsommationElectrique): void {
    const consommationElectriqueViewModel: ConsommationElectriqueViewModel = {
      commentaires: consommationElectrique.commentaires,
      graphique: {
        libelles: [],
        valeur_courante: [],
        valeur_precedente: [],
      },
    };

    consommationElectrique.data.forEach((consommation, index) => {
      if (index % 2 === 0) {
        consommationElectriqueViewModel.graphique.libelles.push(consommation.mois);
        consommationElectriqueViewModel.graphique.valeur_courante.push(consommation.valeur);
      } else {
        consommationElectriqueViewModel.graphique.valeur_precedente.push(consommation.valeur);
      }
    });

    this.viewModel(consommationElectriqueViewModel);
  }
}
