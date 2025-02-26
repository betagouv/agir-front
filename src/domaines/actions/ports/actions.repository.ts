import { Quiz } from '@/domaines/quiz/ports/quizRepository';

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

export interface ActionsRepository {
  recupererToutesLesActions(idUtilisateur: string): Promise<Action[]>;

  recupererActionsAvecFiltre(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
  ): Promise<Action[]>;

  chargerAction(idUtilisateur: string, idAction: string, type: TypeAction): Promise<ActionDetail>;

  recupererActionsPersonnalisees(
    idUtilisateur: string,
    thematiqueId: string,
  ): Promise<ActionsRecommandeesDansUneThematique>;
}
