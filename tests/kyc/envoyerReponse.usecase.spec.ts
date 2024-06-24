import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponseUsecase';
import { SpyQuestionRepository } from './adapters/question.repository.spy';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';

describe("Fichier de tests pour envoyer la réponse d'une question KYC", () => {
  it("En donnant un id d'utilisateur, l'id de la question KYC et la réponse doit appeler le back pour sauvegarder la réponse", async () => {
    // GIVEN
    const questionRepository = new SpyQuestionRepository();
    const spyEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerReponseUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', ['Ma réponse, lorem ipsum dolor']);

    // THEN
    expect(questionRepository.envoyerQuestionAEteAppele).toBeTruthy();
    expect(questionRepository.envoyerQuestionArgs).toStrictEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponse: ['Ma réponse, lorem ipsum dolor'],
    });
    expect(spyEventBus.eventName).toEqual(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  });
});
