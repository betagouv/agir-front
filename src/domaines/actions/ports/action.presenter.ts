import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';

export interface ActionPresenter {
  presenteActionClassique(action: ActionDetail): void;

  presenteActionQuiz(action: ActionDetail): void;
}

export interface ActionBaseViewModel {
  titre: string;
  titreAffiche: string;
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
  aides: ActionAideViewModel[];
}

export interface ActionQuizzesViewModel extends ActionBaseViewModel {
  quizzes: ActionQuizViewModel[];
  quizzFelicitations?: string;
}

export interface ActionQuizViewModel {
  id: string;
  titre: string;
  question: ActionQuizQuestionViewModel;
  nombreDePointsAGagner: string;
  articleAssocie: ArticleDuQuiz | null;
}

export interface ActionQuizQuestionViewModel {
  intitule: string;
  reponsesPossibles: { label: string; value: string }[];
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

export interface ActionAideViewModel {
  titre: string;
  id: string;
  titreUrl: string;
  partenaireNom: string;
}
