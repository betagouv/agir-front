import { EvaluerQuizzPresenter } from "@/quizz/ports/evaluerQuizz.presenter.ts";

export interface EvaluerQuizzViewModel {
  resultat: string;
}
export class EvaluerQuizzPresenterImpl implements EvaluerQuizzPresenter {
  private _evaluerQuizzViewModel: (viewModel: EvaluerQuizzViewModel) => void;
  constructor(evaluerQuizzViewModel: (viewModel: EvaluerQuizzViewModel) => void) {
    this._evaluerQuizzViewModel = evaluerQuizzViewModel;
  }
  presente(succes: boolean): void {
    this._evaluerQuizzViewModel({
      resultat: succes ? "Bravo" : "Perdu",
    });
  }
}
