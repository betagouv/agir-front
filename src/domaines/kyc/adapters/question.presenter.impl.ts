import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { QuestionPresenter } from '@/domaines/kyc/ports/question.presenter';
import { Question } from '@/domaines/kyc/recupererQuestionUsecase';

export class QuestionPresenterImpl implements QuestionPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel) => void) {}

  presente(question: Question) {
    this.questionViewModel(QuestionViewModelBuilder.buildFromQuestion(question));
  }
}
