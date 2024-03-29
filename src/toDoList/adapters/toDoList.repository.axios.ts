import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { TodoList } from '@/toDoList/recupererToDoList.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface ToDoListApiModel {
  numero_todo: number;
  points_todo: number;
  titre: string;
  is_last: boolean;
  todo: [
    {
      thematiques: string[];
      titre: string;
      type: string;
      content_id: string;
      id: string;
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
      id: string;
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
      titre: response.data.titre,
      pointFinDeMission: response.data.points_todo,
      derniere: response.data.is_last,
      aFaire: response.data.todo.map(todo => ({
        id: todo.id,
        titre: todo.titre,
        contentId: todo.content_id || '',
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
        id: todo.id,
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

  @intercept401()
  async recupererPointsToDo(idUtilisateur: string, elementId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post<boolean>(`/utilisateurs/${idUtilisateur}/todo/${elementId}/gagner_points`);
  }

  @intercept401()
  async terminerToDo(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post<boolean>(`/utilisateurs/${idUtilisateur}/todo/gagner_points`);
  }
}
