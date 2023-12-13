import { TerminerToDoListUsecase } from '@/toDoList/terminerToDoList.usecase';
import { SpyToDoListRepository } from './adapters/spyTodoListRepository';
import { SpyToDoListEventBus } from './spyTodoListEventBus';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';

describe("Fichier de tests concernant la fin d'une Todo List", () => {
  it('En donnant un id utilisateurdoit appeler le back pour prevenir que la todo entière a été faite', async () => {
    // GIVEN
    const spyToDoListRepository = new SpyToDoListRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();

    const usecase = new TerminerToDoListUsecase(spyToDoListRepository, spyToDoListEventBus);

    // WHEN
    await usecase.execute('utilisateurId');

    // THEN
    expect(spyToDoListRepository.terminerToDoAEteAppele).toBeTruthy();
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_A_ETE_TERMINEE);
  });
});
