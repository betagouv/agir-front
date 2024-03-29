import { InteractionType } from '@/shell/interactionType';
import { ToDoListRepository } from '@/toDoList/ports/toDoList.repository';
import { TodoList } from '@/toDoList/recupererToDoList.usecase';

export class MockToDoListRepository implements ToDoListRepository {
  async recupererPointsToDo(idUtilisateur: string, elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async terminerToDo(idUtilisateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererToDoList(idUtilisateur: string): Promise<TodoList> {
    return Promise.resolve({
      titre: 'Ma ToDo List',
      pointFinDeMission: 30,
      derniere: false,
      fait: [
        {
          id: 'id2',
          interactionId: 'interactionId2',
          titre: 'Article qui doit être en avant',
          url: '/article/Article qui doit être en avant/1',
          contentId: '1',
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
          id: 'id3',
          interactionId: 'interactionId3',
          titre: 'Consulter une recommandation',
          url: '',
          contentId: '',
          progession: {
            etapeCourante: 1,
            etapeTotal: 1,
          },
          nombreDePointsAGagner: 10,
          type: InteractionType.RECOMMANDATION,
          thematique: '🌍 Global',
          pointAEteRecolte: false,
        },
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
        {
          id: 'id3',
          interactionId: 'interactionId3',
          titre: 'Installer un service',
          url: '',
          contentId: '',
          progession: {
            etapeCourante: 1,
            etapeTotal: 1,
          },
          nombreDePointsAGagner: 10,
          type: InteractionType.SERVICE,
          thematique: '🌍 Global',
          pointAEteRecolte: false,
        },
        {
          id: 'id4',
          interactionId: 'interactionId4',
          titre: 'Installer un service',
          url: '',
          contentId: '',
          progession: {
            etapeCourante: 1,
            etapeTotal: 1,
          },
          nombreDePointsAGagner: 10,
          type: InteractionType.SERVICE,
          thematique: '🌍 Global',
          pointAEteRecolte: false,
        },
      ],
    });
  }
}
