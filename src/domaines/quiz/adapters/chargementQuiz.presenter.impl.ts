import { ChargementQuizzPresenter } from '@/domaines/quiz/ports/chargementQuizz.presenter';
import { ArticleDuQuiz, Quiz, QuizDifficulte } from '@/domaines/quiz/ports/quizRepository';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagStyle, TagThematique } from '@/domaines/thematiques/TagThematique';

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
  question: QuestionViewModel;
  thematiqueTag: {
    label: string;
    style: TagStyle;
  };
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
      thematiqueTag: {
        label: MenuThematiques.getThematiqueData(quiz.clefThematiqueAPI).labelDansLeMenu,
        style: TagThematique.getTagThematiqueUtilitaire(quiz.clefThematiqueAPI),
      },
      titre: quiz.titre,
      question: {
        id: '0',
        intitule: quiz.questions[0].intitule,
        reponsesPossibles: quiz.questions[0].reponsesPossibles,
        ordre: quiz.questions[0].ordre,
        texteExplicationOK: quiz.questions[0].texteExplicationOK,
        texteExplicationKO: quiz.questions[0].texteExplicationKO,
        solution: quiz.questions[0].solution,
      },
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
