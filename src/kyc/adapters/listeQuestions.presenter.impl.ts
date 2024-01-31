import { ListeQuestionsPresenter, QuestionViewModel } from '@/kyc/ports/listeQuestions.presenter';
import { Question } from '@/kyc/recupererQuestionUsecase';

export class ListeQuestionsPresenterImpl implements ListeQuestionsPresenter {
  constructor(private readonly questionsViewModel: (viewModel: QuestionViewModel[]) => void) {}
  presente(questions: Question[]): void {
    this.questionsViewModel(
      questions.map(question => ({
        id: question.id,
        libelle: question.libelle,
        reponse: question.reponse?.join(' - '),
      }))
    );
  }
}
