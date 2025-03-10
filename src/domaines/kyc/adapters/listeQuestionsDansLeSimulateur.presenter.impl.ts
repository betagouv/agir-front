import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export class ListeQuestionsDansLeSimulateurPresenterImpl implements ListeQuestionsPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel[]) => void) {}

  presente(questions: Question[]) {
    this.questionViewModel(questions.map(question => QuestionViewModelBuilder.buildFromQuestion(question)));
  }
}
