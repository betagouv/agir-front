import { QuestionPresenter } from '@/kyc/ports/question.presenter';
import { Question } from '@/kyc/recupererQuestionUsecase';

export interface ReponsePossible {
  id: string;
  label: string;
}
export interface QuestionViewModel {
  id: string;
  libelle: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: ReponsePossible[];
  points: string;
  reponses: string | string[];
}

export class QuestionPresenterImpl implements QuestionPresenter {
  constructor(private readonly questionViewModel: (viewModel: QuestionViewModel) => void) {}

  presente(question: Question) {
    this.questionViewModel({
      id: question.id,
      libelle: question.libelle,
      type: question.type,
      points: `Récoltez vos + ${question.points} points`,
      reponses_possibles: question.reponses_possibles.map(reponse => ({
        id: reponse,
        label: reponse,
      })),
      reponses: question.reponse,
    });
  }
}
