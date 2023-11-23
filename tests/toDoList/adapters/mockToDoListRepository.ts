import { InteractionType } from '@/interactions/chargerInteractions.usecase';
import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { TodoList } from '@/toDoList/recupererToDoList.usecase';

export class MockToDoListRepository implements ToDoListRepository {
  async recupererPointsToDo(idUtilisateur: string, elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererToDoList(idUtilisateur: string): Promise<TodoList> {
    return Promise.resolve({
      fait: [
        {
          id: 'id2',
          interactionId: 'interactionId2',
          titre: 'Article qui doit être en avant',
          url: '/article/Article qui doit être en avant',
          contentId: '',
          progession: {
            etapeCourante: 1,
            etapeTotal: 1,
          },
          nombreDePointsAGagner: 10,
          type: InteractionType.ARTICLE,
          thematique: '🌍 Global',
          pointAEteRecolte: true,
        },
      ],
      aFaire: [
        {
          id: 'id',
          interactionId: 'interactionId',
          titre: 'Premier Quiz',
          url: '/coach/quiz/',
          contentId: '',
          progession: {
            etapeCourante: 1,
            etapeTotal: 2,
          },
          nombreDePointsAGagner: 10,
          type: InteractionType.QUIZ,
          thematique: '🚲 Transports',
          pointAEteRecolte: false,
        },
      ],
    });
  }
}
