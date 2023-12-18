import { Quiz } from '@/quiz/ports/quizRepository';
import { ChargementQuizzPresenter } from '@/quiz/ports/chargementQuizz.presenter';

export interface QuestionViewModel {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
  ordre: string;
  texteExplicationOK: string;
  texteExplicationKO: string;
  solution: string;
}

export interface QuizViewModel {
  titre: string;
  questions: QuestionViewModel[];
  steps: string;
  thematique: string;
}

export class ChargementQuizPresenterImpl implements ChargementQuizzPresenter {
  private _quizViewModel: (viewModel: QuizViewModel) => void;

  constructor(quizViewModel: (viewModel: QuizViewModel) => void) {
    this._quizViewModel = quizViewModel;
  }

  presenteQuiz(quiz: Quiz): void {
    this._quizViewModel({
      thematique: quiz.thematique,
      steps: (quiz.questions.length * 2).toString(),
      titre: quiz.titre,
      questions: quiz.questions.map(question => {
        return {
          id: question.id,
          intitule: question.intitule,
          reponsesPossibles: question.reponsesPossibles,
          ordre: question.ordre,
          texteExplicationOK: question.texteExplicationOK,
          texteExplicationKO: question.texteExplicationKO,
          solution: question.solution,
        };
      }),
    });
  }
}
