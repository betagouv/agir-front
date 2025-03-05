import { ArticleDuQuiz, Quiz } from '@/domaines/quiz/ports/quiz.repository';
import { TagStyle } from '@/domaines/thematiques/TagThematique';

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

export interface ChargementQuizzPresenter {
  presenteQuiz(quizz: Quiz): void;
}
