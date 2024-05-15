import { InteractionType } from '@/shell/interactionType';
import { ToDoListRepository } from '@/domaines/toDoList/ports/toDoList.repository';
import { TodoList } from '@/domaines/toDoList/recupererToDoList.usecase';

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
          idDuContenu: '1',
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
          idDuContenu: '',
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
          idDuContenu: '',
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
          idDuContenu: 'leservice',
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
          idDuContenu: 'leservice',
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
