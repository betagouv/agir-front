import { ActionDetail } from '@/domaines/actions/ports/actions.repository';

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

export interface ActionQuizViewModel extends ActionBaseViewModel {
  quiz: {
    nombreDeQuestion: number;
  };
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
