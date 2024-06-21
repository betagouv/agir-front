import { RecommandationPersonnaliseAEteCliqueeUsecase } from '@/domaines/recommandationsPersonnalisees/recommandationPersonnaliseAEteCliquee.usecase';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { SpyRecommandationsPersonnaliseesRepository } from './adapters/recommandationsPersonnalisees.repository.spy';

describe('Fichier de tests concernant le clique sur les recommandations personnalisées', () => {
  it("Lors d'un clique sur une recommandation personnalisée on doit prevenir le back qu'une recommandation a été cliquée, et emettre un evenement pour dire qu'un recommandation a été cliquée  et donc refraichir le score", async () => {
    // GIVEN
    const spyRecommandationsPersonnaliseesRepository = new SpyRecommandationsPersonnaliseesRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    const usecase = new RecommandationPersonnaliseAEteCliqueeUsecase(
      spyRecommandationsPersonnaliseesRepository,
      spyToDoListEventBus,
    );

    // WHEN
    await usecase.execute('1');

    // THEN
    expect(spyRecommandationsPersonnaliseesRepository.recommandationAEteCliqueeAEteAppelee).toBe(true);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE);
  });
});
