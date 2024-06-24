import { MarquerLeServiceCommeConsulteUsecase } from '@/domaines/linky/marquerLeServiceCommeConsulte.usecase';
import { LinkyRepositorySpy } from './adapters/linky.repository.spy';
import { expect } from 'vitest';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';

describe('Fichier de tests concernant le fait que le service linky a ete consulté', () => {
  it("Lorsqu'un utilisateur consulte le service linky (page de configuration) on doit prévenir le back", async () => {
    // GIVEN
    // WHEN
    const linkyRepositorySpy = new LinkyRepositorySpy();
    const spyEventBus = new SpyToDoListEventBus();
    const usecase = new MarquerLeServiceCommeConsulteUsecase(linkyRepositorySpy, spyEventBus);
    await usecase.execute('idUtilisateur');
    // THEN
    expect(linkyRepositorySpy.marqueLeServiceCommeConsulteAEteAppele).toBe(true);
    expect(spyEventBus.eventName).toBe(ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE);
  });
});
