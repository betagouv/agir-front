import { ExplicationsRecommandation } from '@/domaines/actions/explicationsRecommandation';
import { Quiz } from '@/domaines/quiz/ports/quiz.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface RecommandationArticle {
  titre: string;
  image: string;
  id: string;
}

export interface ActionService {
  type: 'recettes' | 'longue_vie_objets' | 'proximite';
  parametreDuService: {
    categorie: string;
    sousCategorie?: string;
  };
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
  emoji?: string;
  montantMaxEconomiesEnEuros: number;
  dejaFaite: boolean;
  labelCompteur: string;
  explicationsRecommandations: ExplicationsRecommandation;
}

export interface ActionDetail {
  code: string;
  titre: string;
  sousTitre: string;
  emoji: string;
  points: number;
  consigne: string;
  labelCompteur: string;
  type: TypeAction;
  commune: string;
  corps: {
    introduction: string;
    astuces: string;
  };
  quizzes?: Quiz[];
  quizzFelicitations?: string;
  articles: RecommandationArticle[];
  nombreDeRealisations: number;
  nombreAidesDisponibles: number;
  realisee: boolean;
  services: ActionService[];
  aides: ActionAide[];
  faq: ActionFAQ[];
  idEnchainementKYCs: string;
  thematique: ClefThematiqueAPI;
  sources: {
    label: string;
    url: string;
  }[];
  explicationsRecommandations: ExplicationsRecommandation;
}

export enum TypeAction {
  CLASSIQUE = 'classique',
  SIMULATEUR = 'simulateur',
  BILAN = 'bilan',
  QUIZZ = 'quizz',
}

export interface ResumeThematique {
  thematique: ClefThematiqueAPI;
  commune: string;
  nbRecettes: number;
  nbActions: number;
  nbAides: number;
  nbSimulateurs: number;
}

export interface DetailThematique {
  resume: ResumeThematique;
  doitRepondreAuxKYCs: boolean;
  estUtilisateurNgc: boolean;
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

export type CompteurActions = number;

export interface ActionsRepository {
  chargerCatalogueActionsUtilisateur(idUtilisateur: string): Promise<CatalogueActions>;

  chargerCatalogueActions(): Promise<CatalogueActions>;

  chargerActionsRecommandees(idUtilisateur: string): Promise<Action[]>;

  filtrerCatalogueActions(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    filtreDejaRealisees: boolean,
  ): Promise<CatalogueActions>;

  chargerActionUtilisateur(idUtilisateur: string, idAction: string, type: TypeAction): Promise<ActionDetail>;

  chargerAction(idAction: string, type: TypeAction): Promise<ActionDetail>;

  recupererDetailThematique(idUtilisateur: string, thematiqueId: string): Promise<DetailThematique>;

  terminerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<void>;

  previsualiser(actionId: string, typeAction: TypeAction): Promise<ActionDetail>;

  compterActions(): Promise<CompteurActions>;
}
