import { Question } from '@/kyc/recupererQuestionUsecase';
import { DefiQuestionViewModel, ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export class ListeDefisPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefiQuestionViewModel[]) => void) {}
  presente(defis: Question[]): void {
    this.defisViewModel(
      defis.map(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse: question.reponse?.join(' - '),
      })),
    );
  }
}
