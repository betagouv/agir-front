import { MockToDoListRepository } from './adapters/mockToDoListRepository';
import { RecupererToDoListUsecase } from '@/domaines/toDoList/recupererToDoList.usecase';
import { ToDoListPresenterImpl, TodoListViewModel } from '@/domaines/toDoList/adapters/toDoList.presenter.impl';

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
            picto: '',
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
            url: '/quiz/',
            picto: '/ic_mission_article.svg',
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
            picto: '',
          },
          {
            idDuContenu: 'questionKycId',
            hash: undefined,
            id: 'id4',
            nombreDePointsAGagner: 10,
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Question KYC',
            type: 'kyc',
            url: '/mieux-vous-connaitre/questionKycId',
            picto: '/ic_mission_kyc.svg',
          },
          {
            hash: undefined,
            id: 'id3',
            idDuContenu: '',
            nombreDePointsAGagner: 10,
            picto: '/ic_mission_defi.svg',
            pointAEteRecolte: false,
            progession: {
              etapeCourante: 1,
              etapeTotal: 1,
            },
            thematique: '🌍 Global',
            titre: 'Faire un défi',
            type: 'defi',
            url: '',
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
            picto: '/ic_mission_article.svg',
          },
        ],
        pointFinDeMission: 30,
        titre: 'Ma ToDo List',
        imageUrl: 'imageUrl',
      });
    }
  });
});
