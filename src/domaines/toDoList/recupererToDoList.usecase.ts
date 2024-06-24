import { ToDoListPresenter } from '@/domaines/toDoList/ports/toDoList.presenter';
import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';

export interface TodoList {
  titre: string;
  pointFinDeMission: number;
  derniere: boolean;
  imageUrl: string;
  fait: TodoListItem[];
  aFaire: TodoListItem[];
  featureDebloquee: {
    feature: string;
    titre: string;
    description: string;
  };
}

export interface TodoListItem {
  id: string;
  titre: string;
  idDuContenu: string;
  progession: {
    etapeCourante: number;
    etapeTotal: number;
  };
  nombreDePointsAGagner: number;
  type: string;
  thematique: string;
  pointAEteRecolte: boolean;
}

export class RecupererToDoListUsecase {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async execute(idUtilisateur: string, presenter: ToDoListPresenter): Promise<void> {
    const toDoList = await this.toDoListRepository.recupererToDoList(idUtilisateur);
    presenter.presente(toDoList);
  }
}
