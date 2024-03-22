import { Defi } from '@/defi/recupererListeDefis.usecase';
import { DefiQuestionViewModel, ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export class ListeDefisPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefiQuestionViewModel[]) => void) {}

  presente(defis: Defi[]): void {
    this.defisViewModel(
      defis.map(defi => ({
        id: defi.id,
        libelle: defi.libelle,
        reponse: this.determinerReponse(defi.status),
      })),
    );
  }

  private determinerReponse(status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait'): string {
    if (status === 'en_cours') {
      return '⏳ Défi en cours';
    } else if (status === 'deja_fait') {
      return '✅ Déjà fait';
    } else {
      return '👎 Pas envie';
    }
  }
}
