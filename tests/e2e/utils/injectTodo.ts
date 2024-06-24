import { ToDoListApiModel } from '@/domaines/toDoList/adapters/toDoList.repository.axios';

export class InjectTodo {
  public avecTodo(toDoList: ToDoListApiModel): ToDoListApiModel {
    return toDoList;
  }

  public vierge(): ToDoListApiModel {
    return {
      numero_todo: 0,
      points_todo: 0,
      titre: 'Pas de todo',
      todo: [],
      done: [],
      is_last: true,
      imageUrl: '',
      celebration: {
        type: '',
        titre: '',
        reveal: {
          id: '',
          feature: '',
          titre: '',
          description: '',
        },
      },
    };
  }
}
