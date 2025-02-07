interface RecommandationArticle {
  titre: string;
  image: string;
  url: string;
}

export interface Action {
  titre: string;
  sousTitre: string;
  corps: {
    introduction: string;
    // SERVICE MANGER BOUGER ?
    astuces: string;
    // FAQ ?
  };
  recommandations: RecommandationArticle[];
}

export interface ActionsRepository {
  chargerAction(idUtilisateur: string, idAction: string): Promise<Action>;
}
