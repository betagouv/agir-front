interface RecommandationArticle {
  titre: string;
  image: string;
  url: string;
}

export interface ActionService {
  type: 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous';
  parametreDuService: string;
}

export interface Action {
  code: string;
  titre: string;
  sousTitre: string;
  nombreDePersonnes: number;
  nombreAidesDisponibles: number;
}

export interface ActionDetail {
  code: string;
  titre: string;
  sousTitre: string;
  commune: string;
  corps: {
    introduction: string;
    astuces: string;
  };
  recommandations: RecommandationArticle[];
  nombreDePersonnes: number;
  nombreAidesDisponibles: number;
  services: ActionService[];
}

export interface ActionsRepository {
  recupererToutesLesActions(idUtilisateur: string): Promise<Action[]>;

  chargerAction(idUtilisateur: string, idAction: string): Promise<ActionDetail>;
}
