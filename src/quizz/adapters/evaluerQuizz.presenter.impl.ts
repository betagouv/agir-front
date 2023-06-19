import { EvaluerQuizzPresenter } from "@/quizz/ports/evaluerQuizz.presenter.ts";

export interface EvaluerQuizzViewModel {
  quizzGagne: boolean;
}
export class EvaluerQuizzPresenterImpl implements EvaluerQuizzPresenter {
  private _evaluerQuizzViewModel: (viewModel: EvaluerQuizzViewModel) => void;
  constructor(evaluerQuizzViewModel: (viewModel: EvaluerQuizzViewModel) => void) {
    this._evaluerQuizzViewModel = evaluerQuizzViewModel;
  }
  presente(succes: boolean): void {
    this._evaluerQuizzViewModel({
      quizzGagne: succes,
    });
  }
}
