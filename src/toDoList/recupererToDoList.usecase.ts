import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { ToDoListPresenter } from '@/toDoList/ports/toDoList.presenter';

export interface TodoList {
  fait: TodoListItem[];
  aFaire: TodoListItem[];
}
export interface TodoListItem {
  id: string;
  titre: string;
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
export class RecupererToDoListUsecase {
  constructor(private toDoListRepository: ToDoListRepository) {}

  async execute(idUtilisateur: string, presenter: ToDoListPresenter): Promise<void> {
    const toDoList = await this.toDoListRepository.recupererToDoList(idUtilisateur);
    presenter.presente(toDoList);
  }
}
