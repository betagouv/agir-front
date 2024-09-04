import { ServiceRechercheConsommationLinkyPresenter } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheConsommationLinky.presenter';
import {
  ConsommationElectrique,
  ConsommationElectriqueGlobal,
} from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

interface GraphiqueConsommationLinkyViewModel {
  libelles: string[];
  valeurCourante: number[];
  valeurPrecedente: number[];
  valeurCouranteTranscription: string[];
  valeurPrecedenteTranscription: string[];
}

export interface ConsommationLinkyViewModel {
  id: string;
  titre: string;
  commentaires: string[];
  couleurValeur1: string;
  couleurValeur2: string;
  graphique: GraphiqueConsommationLinkyViewModel;
}

export interface ServiceConsommationLinkyViewModel {
  consommationQuatorzeJours: ConsommationLinkyViewModel;
  consommationAnnuelle: ConsommationLinkyViewModel;
}

export class ServiceRechercheConsommationLinkyPresenterImpl implements ServiceRechercheConsommationLinkyPresenter {
  constructor(private serviceConsommationLinkyViewModel: (viewModel: ServiceConsommationLinkyViewModel) => void) {}

  presente(consommationElectriqueGlobal: ConsommationElectriqueGlobal): void {
    this.serviceConsommationLinkyViewModel({
      consommationQuatorzeJours: {
        id: '14jours',
        titre: '14 derniers jours',
        commentaires: consommationElectriqueGlobal.consommationQuatorzeJours.commentaires,
        couleurValeur1: '#6a6af4',
        couleurValeur2: '#000091',
        graphique: this.determineGraphique(consommationElectriqueGlobal.consommationQuatorzeJours.data, false),
      },
      consommationAnnuelle: {
        id: 'annuelle',
        titre: 'Mois par mois',
        commentaires: consommationElectriqueGlobal.consommationAnnuelle.commentaires,
        couleurValeur1: '#68A532',
        couleurValeur2: '#447049',
        graphique: this.determineGraphique(consommationElectriqueGlobal.consommationAnnuelle.data),
      },
    });
  }

  private determineGraphique(
    data: ConsommationElectrique['data'],
    estAnnuelle = true,
  ): GraphiqueConsommationLinkyViewModel {
    const graphique: GraphiqueConsommationLinkyViewModel = {
      libelles: [],
      valeurPrecedente: [],
      valeurPrecedenteTranscription: [],
      valeurCourante: [],
      valeurCouranteTranscription: [],
    };

    for (const [index, consommation] of data.entries()) {
      const valeurFormatee = Math.round(consommation.valeur) / 1000;

      if (index % 2 === 0) {
        graphique.libelles.push(estAnnuelle ? consommation.mois : this.buildDate(consommation.date));
        graphique.valeurPrecedente.push(Number(valeurFormatee));
        graphique.valeurPrecedenteTranscription.push(`${valeurFormatee} kWh`);
      } else {
        graphique.valeurCourante.push(Number(valeurFormatee));
        graphique.valeurCouranteTranscription.push(`${valeurFormatee} kWh`);
      }
    }

    return graphique;
  }

  private buildDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  }
}
