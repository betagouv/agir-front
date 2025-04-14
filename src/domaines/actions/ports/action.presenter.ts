import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { ArticleDuQuiz } from '@/domaines/quiz/ports/quiz.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export interface ActionPresenter {
  presenteActionClassique(action: ActionDetail): void;

  presenteActionQuiz(action: ActionDetail): void;

  presenteActionSimulateur(action: ActionDetail): void;

  presenteActionBilan(action: ActionDetail): void;
}

export type SourceActionViewModel = {
  label: string;
  url: string;
};

export interface ActionBaseViewModel {
  titre: string;
  titreAffiche: string;
  sousTitre: string;
  consigne: string;
  labelCompteur: string;
  articlesRecommandes: RecommandationArticleViewModel[];
  introduction: string;
  realisee: boolean;
  nombreDeRealisations: number;
  actionId: string;
  points: number;
  sources: SourceActionViewModel[];
}

export interface ActionClassiqueViewModel extends ActionBaseViewModel {
  commune: string;
  astuces: string;
  services: ActionServiceViewModel[];
  aides: ActionAideViewModel[];
  faq: ActionFAQViewModel[];
}

export interface ActionQuizzesViewModel extends ActionBaseViewModel {
  quizzes: ActionQuizViewModel[];
  quizzFelicitations?: string;
}

export interface ActionSimulateurViewModel extends ActionBaseViewModel {
  aides: ActionAideViewModel[];
  kycs: QuestionViewModel[];
}

export interface ActionBilanViewModel extends ActionBaseViewModel {
  aides: ActionAideViewModel[];
  kycs: QuestionViewModel[];
  thematique: ClefThematiqueAPI;
}

export interface ActionQuizViewModel {
  id: string;
  titre: string;
  question: ActionQuizQuestionViewModel;
  nombreDePointsAGagner: string;
  articleAssocie: ArticleDuQuiz | null;
}

export interface ActionQuizQuestionViewModel {
  intitule: string;
  reponsesPossibles: { label: string; value: string }[];
  ordre: string;
  texteExplicationOK: string;
  texteExplicationKO: string;
  solution: string;
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

export interface ActionAideViewModel {
  titre: string;
  id: string;
  titreUrl: string;
  partenaireNom: string;
  partenaireImg?: string;
  montantMaximum?: string;
  estGratuit: boolean;
}

export interface ActionFAQViewModel {
  question: string;
  reponse: string;
}
