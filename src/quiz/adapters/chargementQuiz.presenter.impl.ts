import { ArticleDuQuiz, Quiz, QuizDifficulte } from '@/quiz/ports/quizRepository';
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
  thematique: string;
  difficulte: string;
  nombreDePointsAGagner: string;
  articleAssocie: ArticleDuQuiz | null;
}

export class ChargementQuizPresenterImpl implements ChargementQuizzPresenter {
  private readonly _quizViewModel: (viewModel: QuizViewModel) => void;

  constructor(quizViewModel: (viewModel: QuizViewModel) => void) {
    this._quizViewModel = quizViewModel;
  }

  presenteQuiz(quiz: Quiz): void {
    this._quizViewModel({
      nombreDePointsAGagner: quiz.nombreDePointsAGagner.toString(),
      difficulte: this.determinerDifficulte(quiz),
      thematique: quiz.thematique,
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
      articleAssocie: quiz.articleAssocie,
    });
  }

  private determinerDifficulte(quiz: Quiz) {
    switch (quiz.difficulte) {
      case QuizDifficulte.TRES_FACILE:
        return 'très facile';
      case QuizDifficulte.FACILE:
        return 'facile';
      case QuizDifficulte.MOYEN:
        return 'moyen/intermédiaire';
      case QuizDifficulte.DIFFICILE:
        return 'difficile';
      case QuizDifficulte.TRES_DIFFICILE:
        return 'très difficile';
    }
  }
}
