import { ChargementQuizzPresenter, QuizViewModel } from '@/domaines/quiz/ports/chargementQuizz.presenter';
import { Quiz, QuizDifficulte } from '@/domaines/quiz/ports/quiz.repository';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { TagThematique } from '@/domaines/thematiques/TagThematique';

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
