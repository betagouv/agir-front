import { Quizz } from "@/quizz/ports/quizzRepository.ts";
import { ChargementQuizzPresenter } from "@/quizz/ports/chargementQuizz.presenter.ts";

interface QuestionViewModel {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
}

export interface QuizzViewModel {
  titre: string;
  questions: QuestionViewModel[];
}

export class ChargementQuizzPresenterImpl implements ChargementQuizzPresenter {
  private _quizzViewModel: (viewModel: QuizzViewModel) => void;

  constructor(quizzViewModel: (viewModel: QuizzViewModel) => void) {
    this._quizzViewModel = quizzViewModel;
  }

  presenteQuizz(quizz: Quizz): void {
    this._quizzViewModel({
      titre: quizz.titre,
      questions: quizz.questions.map((question) => {
        return {
          id: question.id,
          intitule: question.intitule,
          reponsesPossibles: question.reponsesPossibles,
        };
      }),
    });
  }
}
