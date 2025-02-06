import { Action } from '@/domaines/actions/ports/actions.repository';

export interface ActionPresenter {
  presenteAction(action: Action): void;
}

export interface ActionViewModel {
  titre: string;
  sousTitre: string;
  corps: {
    introduction: string;
    // SERVICE MANGER BOUGER ?
    astuces: string;
    // FAQ ?
  };
  recommandations: RecommandationArticleViewModel[];
}

interface RecommandationArticleViewModel {
  titre: string;
  image: string;
  url: string;
}
