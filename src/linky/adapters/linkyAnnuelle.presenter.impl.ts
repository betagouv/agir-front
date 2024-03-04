import { ConsommationElectriqueViewModel, LinkyPresenter } from '@/linky/ports/linky.presenter';
import { ConsommationElectrique } from '@/linky/ports/linkyRepository.repository';

export class LinkyPresenterAnnuelleImpl implements LinkyPresenter {
  constructor(private viewModel: (consommationElectriqueViewModel: ConsommationElectriqueViewModel) => void) {}

  presente(consommationElectrique: ConsommationElectrique): void {
    const consommationElectriqueViewModel: ConsommationElectriqueViewModel = {
      description:
        "Suivi de votre consommation électrique mois par mois en comparant l'année courante à l'année précédente (mois en cours exclu) :",
      couleurValeur1: '#6a6af4',
      couleurValeur2: '#000091',
      commentaires: consommationElectrique.commentaires,
      graphique: {
        libelles: [],
        valeur_courante: [],
        valeur_precedente: [],
        valeur_courante_transcription: [],
        valeur_precedente_transcription: [],
      },
    };

    consommationElectrique.data.forEach((consommation, index) => {
      const valeurFormatee = Math.round(consommation.valeur);

      if (index % 2 === 0) {
        consommationElectriqueViewModel.graphique.libelles.push(consommation.mois);
        consommationElectriqueViewModel.graphique.valeur_precedente.push(Number(valeurFormatee));
        consommationElectriqueViewModel.graphique.valeur_precedente_transcription.push(`${valeurFormatee} kWh`);
      } else {
        consommationElectriqueViewModel.graphique.valeur_courante.push(Number(valeurFormatee));
        consommationElectriqueViewModel.graphique.valeur_courante_transcription.push(`${valeurFormatee} kWh`);
      }
    });

    this.viewModel(consommationElectriqueViewModel);
  }
}
