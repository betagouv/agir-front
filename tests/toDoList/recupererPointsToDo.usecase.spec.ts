import { RecupererPointsToDoUsecase } from '@/domaines/toDoList/recupererPointsToDo.usecase';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { SpyToDoListRepository } from './adapters/spyTodoListRepository';
import { SpyToDoListEventBus } from './spyTodoListEventBus';

describe('Fichier de tests concernant la récupération de points suite à une todo validée', () => {
  it("En donnant un id utilisateur et un id de todo doit appeler le back pour prevenir que l'interaction a été faite", async () => {
    // GIVEN
    const spyToDoListRepository = new SpyToDoListRepository();
    const serviceEventBusSpy = new SpyToDoListEventBus();

    const usecase = new RecupererPointsToDoUsecase(spyToDoListRepository, serviceEventBusSpy);

    // WHEN
    await usecase.execute('utilisateurId', 'elementId');

    // THEN
    expect(spyToDoListRepository.recupererToDoListAEteAppele).toBeTruthy();
    expect(serviceEventBusSpy.eventName).toBe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
  });
});
