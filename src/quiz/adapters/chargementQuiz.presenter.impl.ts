import { Quiz } from "@/quiz/ports/quizRepository.ts";
import { ChargementQuizzPresenter } from "@/quiz/ports/chargementQuizz.presenter.ts";

interface QuestionViewModel {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
}

export interface QuizViewModel {
  titre: string;
  questions: QuestionViewModel[];
}

export class ChargementQuizPresenterImpl implements ChargementQuizzPresenter {
  private _quizViewModel: (viewModel: QuizViewModel) => void;

  constructor(quizViewModel: (viewModel: QuizViewModel) => void) {
    this._quizViewModel = quizViewModel;
  }

  presenteQuiz(quiz: Quiz): void {
    this._quizViewModel({
      titre: quiz.titre,
      questions: quiz.questions.map((question) => {
        return {
          id: question.id,
          intitule: question.intitule,
          reponsesPossibles: question.reponsesPossibles,
        };
      }),
    });
  }
}
