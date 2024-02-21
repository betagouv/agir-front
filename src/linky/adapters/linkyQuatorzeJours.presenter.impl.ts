import { ConsommationElectriqueViewModel, LinkyPresenter } from '@/linky/ports/linky.presenter';
import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export class LinkyPresenterQuatorzeJoursImpl implements LinkyPresenter {
  constructor(private viewModel: (consommationElectriqueViewModel: ConsommationElectriqueViewModel) => void) {}

  presente(consommationElectrique: ConsommationElectrique): void {
    const consommationElectriqueViewModel: ConsommationElectriqueViewModel = {
      description: 'Suivi de votre consommation électrique de vos 14 derniers jours :',
      couleurValeur1: '#68A532',
      couleurValeur2: '#447049',
      commentaires: consommationElectrique.commentaires,
      graphique: {
        libelles: [],
        valeur_courante: [],
        valeur_precedente: [],
      },
    };

    consommationElectrique.data.forEach((consommation, index) => {
      if (index % 2 === 0) {
        consommationElectriqueViewModel.graphique.libelles.push(this.buildDate(consommation.date));
        consommationElectriqueViewModel.graphique.valeur_courante.push(consommation.valeur);
      } else {
        consommationElectriqueViewModel.graphique.valeur_precedente.push(consommation.valeur);
      }
    });

    this.viewModel(consommationElectriqueViewModel);
  }

  private buildDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  }
}
