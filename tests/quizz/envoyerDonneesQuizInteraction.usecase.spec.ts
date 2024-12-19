import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { expect } from 'vitest';
import { SpyToDoListEventBus } from '../toDoList/adapters/spyTodoListEventBus';
import { SpyQuizRepository } from './adapters/spyQuizRepository';

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("Dans le cas d'un simple quiz et en donnant un id d'utilisateur, l'id d'une interaction et son pourcentage de réussite au quiz doit publier un evenement QUIZ_A_ETE_TERMINE pour mettre à jour le score", async () => {
    // GIVEN
    const quizRepository = new SpyQuizRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository, spyToDoListEventBus);
    await usecase.execute('utilisateurId', 'quizId', 0);

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(0);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
  });
});
