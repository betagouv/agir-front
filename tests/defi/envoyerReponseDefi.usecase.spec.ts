import { SpyDefiRepository } from './adapters/defi.repository.spy';
import { SpyToDoListEventBus } from '../toDoList/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { EnvoyerReponseDefiUsecase } from '@/defi/envoyerReponseDefi.usecase';

describe("Fichier de tests pour envoyer la réponse d'un défi", () => {
  it("En donnant un id d'utilisateur, l'id de la question du défi et la réponse doit appeler le back pour sauvegarder la réponse", async () => {
    // GIVEN
    const questionRepository = new SpyDefiRepository();
    const spyEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerReponseDefiUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', ['Ma réponse, lorem ipsum dolor']);

    // THEN
    expect(questionRepository.envoyerReponseAEteAppele).toBeTruthy();
    expect(questionRepository.envoyerReponseArgs).toStrictEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponse: ['Ma réponse, lorem ipsum dolor'],
    });
    expect(spyEventBus.eventName).toEqual(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  });
});
