import { ToDoListPresenter } from '@/toDoList/ports/toDoList.presenter';
import { TodoList, TodoListItem } from '@/toDoList/recupererToDoListUsecase';
import { InteractionType } from '@/interactions/chargerInteractions.usecase';

interface TodoViewModel {
  id: string;
  titre: string;
  url: string;
  contentId: string;
  progession: {
    etapeCourante: number;
    etapeTotal: number;
  };
  nombreDePointsAGagner: number;
  type: string;
  thematique: string;
  pointAEteRecolte: boolean;
}

export interface TodoListViewModel {
  aFaire: TodoViewModel[];
  fait: TodoViewModel[];
}

export class ToDoListPresenterImpl implements ToDoListPresenter {
  constructor(private todoListView: (toDoList: TodoListViewModel) => void) {}

  presente(toDoList: TodoList): void {
    this.todoListView({
      aFaire: toDoList.aFaire.map(todo => this.mapToListItemToViewModel(todo)),
      fait: toDoList.fait.map(todo => this.mapToListItemToViewModel(todo)),
    });
  }

  private mapToListItemToViewModel(todo: TodoListItem): TodoViewModel {
    return {
      id: todo.id,
      titre: todo.titre,
      url: this.determineUrl(todo),
      contentId: todo.contentId,
      progession: {
        etapeCourante: todo.progession.etapeCourante,
        etapeTotal: todo.progession.etapeTotal,
      },
      nombreDePointsAGagner: todo.nombreDePointsAGagner,
      type: todo.type,
      thematique: todo.thematique,
      pointAEteRecolte: todo.pointAEteRecolte,
    };
  }

  private determineUrl(todo: TodoListItem) {
    switch (todo.type) {
      case InteractionType.AIDE:
        return '/vos-aides';
      case InteractionType.QUIZ:
        return `/coach/quiz/${todo.contentId}`;
      case InteractionType.ARTICLE:
        return `/article/${todo.titre}`;
      case InteractionType.KYC:
        return '';
      case InteractionType.SUIVIDUJOUR:
        return '/coach/suivi-du-jour';
      default:
        return '';
    }
  }
}
