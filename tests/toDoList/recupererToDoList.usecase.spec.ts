import { MockToDoListRepository } from './adapters/mockToDoListRepository';
import { RecupererToDoListUsecase } from '@/toDoList/recupererToDoList.usecase';
import { ToDoListPresenterImpl, TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';

describe('Fichier de tests concernant la récupération de la ToDo List', () => {
  it("En donnant un id utilisateur doit récuperer une todo List composée d'elements fait et à faire", async () => {
    // GIVEN
    const usecase = new RecupererToDoListUsecase(new MockToDoListRepository());
    // WHEN
    await usecase.execute('id', new ToDoListPresenterImpl(expectation));

    // THEN
    function expectation(toDoList: TodoListViewModel) {
      expect(toDoList).toStrictEqual<TodoListViewModel>({
        aFaire: [
          {
            idDuContenu: '',
            hash: '#recommandations',
            id: 'id3',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Consulter une recommandation',
            type: 'recommandations',
            url: '/agir',
          },
          {
            idDuContenu: '',
            hash: undefined,
            id: 'id',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            type: 'quizz',
            url: '/agir/quiz/',
          },
          {
            idDuContenu: 'leservice',
            hash: '#leservice',
            id: 'id3',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Installer un service',
            type: 'service',
            url: '/agir/services',
          },
          {
            idDuContenu: 'leservice',
            hash: '#leservice',
            id: 'id4',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Installer un service',
            type: 'service',
            url: '/agir/services',
          },
        ],
        derniere: false,
        fait: [
          {
            idDuContenu: '1',
            hash: undefined,
            id: 'id2',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: true,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Article qui doit être en avant',
            type: 'article',
            url: '/article/article-qui-doit-etre-en-avant/1',
          },
        ],
        pointFinDeMission: 30,
        titre: 'Ma ToDo List',
      });
    }
  });
});
