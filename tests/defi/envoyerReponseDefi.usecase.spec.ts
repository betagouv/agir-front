import { SpyDefiRepository } from './adapters/defi.repository.spy';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EnvoyerReponseDefiUsecase } from '@/domaines/defi/envoyerReponseDefi.usecase';

describe("Fichier de tests pour envoyer la réponse d'un défi", () => {
  it("En donnant un id d'utilisateur, l'id de la question du défi et la réponse doit appeler le back pour sauvegarder la réponse", async () => {
    // GIVEN
    const questionRepository = new SpyDefiRepository();
    const spyEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerReponseDefiUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', 'Ma réponse, lorem ipsum dolor', '');

    // THEN
    expect(questionRepository.envoyerReponseAEteAppele).toBeTruthy();
    expect(questionRepository.envoyerReponseArgs).toStrictEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponse: 'Ma réponse, lorem ipsum dolor',
      explication: undefined,
    });
    expect(spyEventBus.eventName).toEqual(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  });

  it("Si la réponse est 'pas_envie', doit appeler le repos avec l'explication", async () => {
    // GIVEN
    const questionRepository = new SpyDefiRepository();
    const spyEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerReponseDefiUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', 'pas_envie', 'une explication');

    // THEN
    expect(questionRepository.envoyerReponseAEteAppele).toBeTruthy();
    expect(questionRepository.envoyerReponseArgs).toStrictEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponse: 'pas_envie',
      explication: 'une explication',
    });
  });

  it("Si la réponse est 'abondon', doit appeler le repos avec l'explication", async () => {
    // GIVEN
    const questionRepository = new SpyDefiRepository();
    const spyEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerReponseDefiUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', 'abondon', 'une explication');

    // THEN
    expect(questionRepository.envoyerReponseAEteAppele).toBeTruthy();
    expect(questionRepository.envoyerReponseArgs).toStrictEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponse: 'abondon',
      explication: 'une explication',
    });
  });
});
