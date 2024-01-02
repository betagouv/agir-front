import { QuestionPresenter } from '@/kyc/ports/question.presenter';
import { Question } from '@/kyc/recupererQuestionUsecase';

export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'ouvert' | 'choix_multiple' | 'choix_unique';
  choix: string[];
}
export class QuestionPresenterImpl implements QuestionPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel) => void) {}
  presente(question: Question) {
    this.questionViewModel({
      id: question.id,
      libelle: question.libelle,
      type: question.type,
      choix: question.choix,
    });
  }
}
