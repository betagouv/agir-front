import { EvaluerQuizPresenter } from "@/quiz/ports/evaluerQuizPresenter.ts";

export interface EvaluerQuizViewModel {
  quizGagne: boolean;
}
export class EvaluerQuizPresenterImpl implements EvaluerQuizPresenter {
  private _evaluerQuizViewModel: (viewModel: EvaluerQuizViewModel) => void;
  constructor(evaluerQuizViewModel: (viewModel: EvaluerQuizViewModel) => void) {
    this._evaluerQuizViewModel = evaluerQuizViewModel;
  }
  presente(succes: boolean): void {
    this._evaluerQuizViewModel({
      quizGagne: succes,
    });
  }
}
