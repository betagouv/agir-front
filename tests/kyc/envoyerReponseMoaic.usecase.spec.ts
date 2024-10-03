import { EnvoyerReponseMosaicUsecase } from '@/domaines/kyc/envoyerReponseMosaic.usecase';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { expect } from 'vitest';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { SpyQuestionRepository } from './adapters/question.repository.spy';

describe("Fichier de tests concernant l'envoie des reponses à une question mosaic", () => {
  it('Doit envoyer les reponses et publier un evenement TODO_KYC_A_ETE_REPONDU', async () => {
    // GIVEN
    const questionRepository = new SpyQuestionRepository();
    const spyEventBus = new SpyToDoListEventBus();

    // WHEN
    const usecase = new EnvoyerReponseMosaicUsecase(questionRepository, spyEventBus);
    await usecase.execute('utilisateurId', 'questionId', [
      {
        code: 'code',
        boolean_value: true,
      },
    ]);

    // THEN
    expect(questionRepository.envoyerReponseMosaicArgs).toEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponses: [
        {
          code: 'code',
          boolean_value: true,
        },
      ],
    });
    expect(spyEventBus.eventName).toEqual(ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
  });
});
