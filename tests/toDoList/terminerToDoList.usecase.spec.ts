import { TerminerToDoListUsecase } from '@/domaines/toDoList/terminerToDoList.usecase';
import { SpyToDoListRepository } from './adapters/spyTodoListRepository';
import { SpyToDoListEventBus } from './adapters/spyTodoListEventBus';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';

describe("Fichier de tests concernant la fin d'une Todo List", () => {
  it('En donnant un id utilisateurdoit appeler le back pour prevenir que la todo entière a été faite', async () => {
    // GIVEN
    const spyToDoListRepository = new SpyToDoListRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    const spySauvegarderUtilisateurSessionRepository = new SpySauvegarderUtilisateurSessionRepository();

    const usecase = new TerminerToDoListUsecase(
      spyToDoListRepository,
      spySauvegarderUtilisateurSessionRepository,
      spyToDoListEventBus,
    );

    // WHEN
    await usecase.execute('utilisateurId', 'aides');

    // THEN
    expect(spyToDoListRepository.terminerToDoAEteAppele).toBeTruthy();
    expect(spySauvegarderUtilisateurSessionRepository.nouvelleFeatureDebloqueeAEteAppele).toBeTruthy();
    expect(spySauvegarderUtilisateurSessionRepository.nouvelleFeatureDebloqueeArgs).toBe('aides');
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_A_ETE_TERMINEE);
  });
});
