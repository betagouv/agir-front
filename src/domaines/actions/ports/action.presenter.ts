import { ActionDetail } from '@/domaines/actions/ports/actions.repository';

export interface ActionPresenter {
  presenteActionClassique(action: ActionDetail): void;

  presenteActionQuiz(action: ActionDetail): void;
}

export interface ActionClassiqueViewModel {
  titre: string;
  sousTitre: string;
  commune: string;
  corps: {
    introduction: string;
    astuces: string;
  };
  recommandations: RecommandationArticleViewModel[];
  services: ActionServiceViewModel[];
}

export interface ActionQuizViewModel {
  titre: string;
  sousTitre: string;
  quiz: {
    nombreDeQuestion: number;
  };
  recommandations: RecommandationArticleViewModel[];
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
