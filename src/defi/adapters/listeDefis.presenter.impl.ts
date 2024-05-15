import { DefiQuestionViewModel, DefisQuestionViewModel, ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';
import { Defi } from '@/defi/recupererListeDefis.usecase';

export class ListeDefisPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefisQuestionViewModel) => void) {}

  presente(defis: Defi[]): void {
    const defisEncours = this.construireListeDefi(defis, ['en_cours']);
    const defisTermines = this.construireListeDefi(defis, ['fait', 'deja_fait']);
    const defisAbandonnes = this.construireListeDefi(defis, ['abondon', 'pas_envie']);

    this.defisViewModel({
      enCours: defisEncours,
      termine: defisTermines,
      abandonne: defisAbandonnes,
      pasDeDefi: defisEncours.length === 0 && defisTermines.length === 0 && defisAbandonnes.length === 0,
    });
  }

  private determinerReponse(status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait'): string {
    if (status === 'en_cours') {
      return '⏳ Défi en cours';
    } else if (status === 'deja_fait') {
      return '✅ Déjà fait';
    } else if (status === 'fait') {
      return '🏆 Défi réalisé';
    } else if (status === 'abondon') {
      return '❌ Abandonné';
    } else {
      return '👎 Pas envie';
    }
  }

  private construireListeDefi(defis: Defi[], status: string[]): DefiQuestionViewModel[] {
    return defis
      .filter(defi => status.includes(defi.status))
      .map<DefiQuestionViewModel>(defi => ({
        id: defi.id,
        libelle: defi.libelle,
        reponse: this.determinerReponse(defi.status),
        explication: defi.explicationRefus,
      }));
  }
}
