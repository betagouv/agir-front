import { Defi } from '@/defi/recupererListeDefis.usecase';
import { DefiQuestionViewModel, ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export class ListeDefisPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefiQuestionViewModel[]) => void) {}

  presente(defis: Defi[]): void {
    this.defisViewModel(
      defis.map(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse: '',
      })),
    );
  }
}
