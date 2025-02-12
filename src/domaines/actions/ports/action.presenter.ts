import { ActionDetail } from '@/domaines/actions/ports/actions.repository';

export interface ActionPresenter {
  presenteAction(action: ActionDetail): void;
}

export interface ActionViewModel {
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

export interface ActionServiceViewModel {
  type: 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous';
  parametreDuService: string;
}

interface RecommandationArticleViewModel {
  titre: string;
  image: string;
  url: string;
}
