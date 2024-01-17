import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnaliseAEteCliqueeUsecase } from '@/recommandationsPersonnalisees/recommandationPersonnaliseAEteCliquee.usecase';
import { SpyToDoListEventBus } from '../toDoList/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';

class SpyRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  get recommandationAEteCliqueeAEteAppelee(): boolean {
    return this._recommandationAEteCliqueeAEteAppelee;
  }
  private _recommandationAEteCliqueeAEteAppelee: boolean = false;
  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    throw new Error('Method not implemented.');
  }
  recommandationAEteCliquee(idUtilisateur: string): Promise<void> {
    this._recommandationAEteCliqueeAEteAppelee = true;
    return Promise.resolve();
  }
}
describe('Fichier de tests concernant le clique sur les recommandations personnalisées', () => {
  it("Lors d'un clique sur une recommandation personnalisée on doit prevenir le back qu'une recommandation a été cliquée, et emettre un evenement pour dire qu'un recommandation a été cliquée  et donc refraichir le score", async () => {
    // GIVEN
    const spyRecommandationsPersonnaliseesRepository = new SpyRecommandationsPersonnaliseesRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    const usecase = new RecommandationPersonnaliseAEteCliqueeUsecase(
      spyRecommandationsPersonnaliseesRepository,
      spyToDoListEventBus
    );

    // WHEN
    await usecase.execute('1');

    // THEN
    expect(spyRecommandationsPersonnaliseesRepository.recommandationAEteCliqueeAEteAppelee).toBe(true);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE);
  });
});
