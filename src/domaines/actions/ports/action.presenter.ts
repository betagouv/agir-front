import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import { QuestionViewModel, QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';
import { TagStyle } from '@/domaines/thematiques/TagThematique';

export interface ActionPresenter {
  presenteActionClassique(action: ActionDetail): void;

  presenteActionQuiz(action: ActionDetail): void;
}

export interface ActionBaseViewModel {
  titre: string;
  sousTitre: string;
  recommandations: RecommandationArticleViewModel[];
}

export interface ActionClassiqueViewModel extends ActionBaseViewModel {
  commune: string;
  corps: {
    introduction: string;
    astuces: string;
  };
  services: ActionServiceViewModel[];
}

export interface ActionQuizzesViewModel extends ActionBaseViewModel {
  quizzes: ActionQuizViewModel[];
}

export interface ActionQuizViewModel {
  titre: string;
  question: ActionQuizQuestionViewModel;
  nombreDePointsAGagner: string;
  articleAssocie: ArticleDuQuiz | null;
}

export interface ActionQuizQuestionViewModel {
  id: string;
  intitule: string;
  reponsesPossibles: string[];
  ordre: string;
  texteExplicationOK: string;
  texteExplicationKO: string;
  solution: string;
}

export interface ActionServiceViewModel {
  type: 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous';
  parametreDuService: string;
}

interface RecommandationArticleViewModel {
  titre: string;
  image: string;
  url: string;
}
