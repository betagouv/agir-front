interface RecommandationArticle {
  titre: string;
  image: string;
  url: string;
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
  nombreDePersones: number;
  nombreAideDispobible: number;
}

export interface ActionsRepository {
  recupererToutesLesActions(): Promise<Action[]>;

  chargerAction(idUtilisateur: string, idAction: string): Promise<Action>;
}
