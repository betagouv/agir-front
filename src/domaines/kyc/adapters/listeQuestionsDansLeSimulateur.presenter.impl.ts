import { QuestionViewModelBuilder } from '@/domaines/kyc/adapters/question.base.presenter';
import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
import { ListeQuestionsPresenter } from '@/domaines/kyc/ports/listeQuestions.presenter';
import { Question } from '@/domaines/kyc/recupererQuestion.usecase';

export class ListeQuestionsDansLeSimulateurPresenterImpl implements ListeQuestionsPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel[]) => void) {}

  presente(questions: Question[]) {
    this.questionViewModel(
      questions.map(question =>
        QuestionViewModelBuilder.buildFromQuestion({
          question,
          etapeCourante: 0,
          nombreTotalDeQuestions: 1,
        }),
      ),
    );
  }
}
