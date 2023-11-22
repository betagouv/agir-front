import { InteractionType } from '@/interactions/chargerInteractions.usecase';
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
            id: 'id',
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
        fait: [
          {
            id: 'id2',
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
      });
    }
  });
});
