import { ToDoListPresenter } from '@/domaines/toDoList/ports/toDoList.presenter';
import { TodoList, TodoListItem } from '@/domaines/toDoList/recupererToDoList.usecase';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteAidesPath } from '@/router/aides/routes';
import { RouteArticlePath } from '@/router/articles/routes';
import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';
import { RouteCoachName } from '@/router/coach/routeCoachName';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteKycPath } from '@/router/kyc/routes';
import { RouteQuizPath } from '@/router/quiz/routes';
import { buildUrl } from '@/shell/buildUrl';
import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
import { InteractionType } from '@/shell/interactionType';

export interface TodoViewModel {
  id: string;
  titre: string;
  url: string;
  idDuContenu: string;
  progression: {
    etapeCourante: number;
    etapeTotal: number;
  };
  nombreDePointsAGagner: number;
  type: string;
  thematique: string;
  pointAEteRecolte: boolean;
  hash?: string;
  picto: string;
}

export interface TodoListViewModel {
  titre: string;
  pointFinDeMission: number;
  derniere: boolean;
  imageUrl: string;
  aFaire: TodoViewModel[];
  fait: TodoViewModel[];
  featureDebloquee?: {
    id: Fonctionnalites;
    titre: string;
    url: string;
  };
}

export class ToDoListPresenterImpl implements ToDoListPresenter {
  constructor(private todoListView: (toDoList: TodoListViewModel) => void) {}

  presente(toDoList: TodoList): void {
    this.todoListView({
      titre: toDoList.titre,
      pointFinDeMission: toDoList.pointFinDeMission,
      derniere: toDoList.derniere,
      aFaire: toDoList.aFaire.map(todo => this.mapToListItemToViewModel(todo)),
      fait: toDoList.fait.map(todo => this.mapToListItemToViewModel(todo)),
      imageUrl: toDoList.imageUrl,
      featureDebloquee: this.determineFeatureDebloquee(toDoList.featureDebloquee),
    });
  }

  private mapToListItemToViewModel(todo: TodoListItem): TodoViewModel {
    return {
      id: todo.id,
      titre: todo.titre,
      url: this.determineUrl(todo),
      idDuContenu: todo.idDuContenu,
      progression: {
        etapeCourante: todo.progession.etapeCourante,
        etapeTotal: todo.progession.etapeTotal,
      },
      nombreDePointsAGagner: todo.nombreDePointsAGagner,
      type: todo.type,
      thematique: todo.thematique,
      pointAEteRecolte: todo.pointAEteRecolte,
      hash: this.determineHash(todo),
      picto: this.determinePicto(todo),
    };
  }

  private determineUrl(todo: TodoListItem) {
    switch (todo.type) {
      case InteractionType.AIDE:
        return RouteAidesPath.AIDES;
      case InteractionType.QUIZ:
        return `${RouteQuizPath.QUIZ}${todo.idDuContenu}`;
      case InteractionType.ARTICLE:
        return `${RouteArticlePath.ARTICLE}${buildUrl(todo.titre)}/${todo.idDuContenu}`;
      case InteractionType.KYC:
        return `${RouteKycPath.KYC}${todo.idDuContenu}`;
      case InteractionType.COMPTE:
        return `${RouteCoachPath.COACH}/${RouteComptePath.MON_COMPTE}`;
      case InteractionType.SERVICE:
        return `${RouteCoachPath.COACH}/${RouteCoachPath.SERVICES}`;
      case InteractionType.RECOMMANDATION:
        return RouteCoachPath.COACH;
      case InteractionType.ENCHAINEMENT_KYC:
        return `${RouteKycPath.KYC_ONBOARDING}${todo.idDuContenu}`;
      default:
        return '';
    }
  }

  private determineHash(todo: TodoListItem) {
    switch (todo.type) {
      case InteractionType.RECOMMANDATION:
        return '#recommandations';
      case InteractionType.SERVICE:
        return `#${todo.idDuContenu}`;
      default:
        return undefined;
    }
  }

  private determinePicto(todo: TodoListItem) {
    switch (todo.type) {
      case InteractionType.DEFIS:
        return '/ic_mission_defi.svg';
      case InteractionType.ARTICLE:
      case InteractionType.QUIZ:
        return '/ic_mission_article.svg';
      case InteractionType.ENCHAINEMENT_KYC:
      case InteractionType.KYC:
        return '/ic_mission_kyc.svg';
      default:
        return '';
    }
  }

  private determineFeatureDebloquee(
    featureDebloquee: TodoList['featureDebloquee'],
  ): TodoListViewModel['featureDebloquee'] {
    switch (featureDebloquee?.feature) {
      case Fonctionnalites.AIDES:
        return {
          id: Fonctionnalites.AIDES,
          titre: 'Retrouver les aides financières auxquelles vous êtes éligible',
          url: RouteAidesName.AIDES,
        };
      case Fonctionnalites.BIBLIOTHEQUE:
        return {
          id: Fonctionnalites.BIBLIOTHEQUE,
          titre: 'Retrouver les articles lus dans la bibliothèque',
          url: RouteCoachName.BIBLIOTHEQUE,
        };
      case Fonctionnalites.BILAN_CARBONE:
        return {
          id: Fonctionnalites.BILAN_CARBONE,
          titre: 'Retrouver une estimation de votre empreinte environnementale',
          url: RouteBilanCarboneName.BILAN_CARBONE,
        };
      default:
        return undefined;
    }
  }
}
