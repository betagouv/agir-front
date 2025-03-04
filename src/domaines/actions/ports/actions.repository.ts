import { Quiz } from '@/domaines/quiz/ports/quizRepository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface RecommandationArticle {
  titre: string;
  image: string;
  url: string;
}

export interface ActionService {
  type: 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous';
  parametreDuService: string;
}

export interface CatalogueActions {
  actions: Action[];
  filtres: {
    code: ClefThematiqueAPI;
    label: string;
    selected: boolean;
  }[];
  consultation: string;
}

export interface Action {
  code: string;
  titre: string;
  sousTitre: string;
  nombreDePersonnes: number;
  nombreAidesDisponibles: number;
  type: TypeAction;
  dejaVue: boolean;
}

export interface ActionDetail {
  code: string;
  titre: string;
  sousTitre: string;
  type: 'classique' | 'quizz' | 'kyc';
  commune: string;
  corps: {
    introduction: string;
    astuces: string;
  };
  quizzes?: Quiz[];
  quizzFelicitations?: string;
  recommandations: RecommandationArticle[];
  nombreDePersonnes: number;
  nombreAidesDisponibles: number;
  services: ActionService[];
  aides: ActionAide[];
  faq: ActionFAQ[];
}

export enum TypeAction {
  CLASSIQUE = 'classique',
  BILAN = 'bilan',
  QUIZZ = 'quizz',
}

export interface ActionsRecommandeesDansUneThematique {
  doitRepondreAuxKYCs: boolean;
  idEnchainementKYCs: string | null;
  actions: Action[];
}

export interface ActionAide {
  titre: string;
  id: string;
  partenaireNom: string;
  partenaireImg?: string;
  montantMaximum?: number;
  estGratuit: boolean;
}

export interface ActionFAQ {
  question: string;
  reponse: string;
}

export interface ActionsRepository {
  chargerCatalogueActions(idUtilisateur: string): Promise<CatalogueActions>;

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<CatalogueActions>;

  chargerAction(idUtilisateur: string, idAction: string, type: TypeAction): Promise<ActionDetail>;

  recupererActionsPersonnalisees(
    idUtilisateur: string,
    thematiqueId: string,
  ): Promise<ActionsRecommandeesDansUneThematique>;
}
