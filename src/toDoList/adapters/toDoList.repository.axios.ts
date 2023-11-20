import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { TodoList } from '@/toDoList/recupererToDoListUsecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface ToDoListApiModel {
  numero_todo: number;
  points_todo: number;
  todo: [
    {
      thematiques: string[];
      titre: string;
      type: string;
      content_id: string;
      interaction_id: string;
      points: number;
      sont_points_en_poche: boolean;
      progression: {
        current: number;
        target: number;
      };
    }
  ];
  done: [
    {
      thematiques: string[];
      titre: string;
      type: string;
      content_id: string;
      interaction_id: string;
      points: number;
      sont_points_en_poche: boolean;
      progression: {
        current: number;
        target: number;
      };
    }
  ];
}

export class ToDoListRepositoryAxios implements ToDoListRepository {
  @intercept401()
  async recupererToDoList(idUtilisateur: string): Promise<TodoList> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ToDoListApiModel>(`/utilisateurs/${idUtilisateur}/todo`);
    return {
      aFaire: response.data.todo.map(todo => ({
        id: todo.interaction_id,
        titre: todo.titre,
        contentId: todo.content_id,
        progession: {
          etapeCourante: todo.progression.current,
          etapeTotal: todo.progression.target,
        },
        nombreDePointsAGagner: todo.points,
        type: todo.type,
        thematique: todo.thematiques[0],
        pointAEteRecolte: todo.sont_points_en_poche,
      })),
      fait: response.data.done.map(todo => ({
        id: todo.interaction_id,
        titre: todo.titre,
        contentId: todo.content_id,
        progession: {
          etapeCourante: todo.progression.current,
          etapeTotal: todo.progression.target,
        },
        nombreDePointsAGagner: todo.points,
        type: todo.type,
        thematique: todo.thematiques[0],
        pointAEteRecolte: todo.sont_points_en_poche,
      })),
    };
  }
}
