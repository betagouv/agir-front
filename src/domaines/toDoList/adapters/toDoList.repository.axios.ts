import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';
import { TodoList } from '@/domaines/toDoList/recupererToDoList.usecase';

interface Reveal {
  id: string;
  feature: string;
  titre: string;
  description: string;
}

export interface ToDoListApiModel {
  numero_todo: number;
  points_todo: number;
  titre: string;
  imageUrl: string;
  is_last: boolean;
  todo:
    | {
        thematiques: string[];
        titre: string;
        type: string;
        content_id: string;
        service_id: string;
        id: string;
        points: number;
        sont_points_en_poche: boolean;
        progression: {
          current: number;
          target: number;
        };
      }[]
    | [];

  done:
    | {
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
      }[]
    | [];
  celebration?: {
    type: string;
    titre: string;
    reveal: Reveal;
  };
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
      imageUrl: response.data.imageUrl,
      featureDebloquee: response.data.celebration
        ? {
            titre: response.data.celebration?.reveal.titre,
            description: response.data.celebration?.reveal.description,
            feature: response.data.celebration?.reveal.feature,
          }
        : undefined,
      aFaire: response.data.todo.map(todo => ({
        id: todo.id,
        titre: todo.titre,
        idDuContenu: todo.content_id || todo.service_id || '',
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
        idDuContenu: todo.content_id,
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
