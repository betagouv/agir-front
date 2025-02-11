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
  corps: {
    introduction: string;
    // SERVICE MANGER BOUGER ?
    astuces: string;
    // FAQ ?
  };
  recommandations: RecommandationArticle[];
  nombreDePersonnes: number;
  nombreAidesDisponibles: number;
  services: ActionService[];
}

export interface ActionsRepository {
  recupererToutesLesActions(): Promise<Action[]>;

  chargerAction(idUtilisateur: string, idAction: string): Promise<Action>;
}
