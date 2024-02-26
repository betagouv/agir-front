import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { expect } from 'vitest';
import { SpyToDoListEventBus } from '../toDoList/spyTodoListEventBus';
import { SpyQuizRepository } from './adapters/spyQuizRepository';

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("Dans le cas d'un simple quiz et en donnant un id d'utilisateur, l'id d'une interaction et son pourcentage de réussite au quiz doit appeler le back pour prevenir que l'interaction a été faite et publier un evenement QUIZ_A_ETE_TERMINE pour mettre à jour le score", async () => {
    // GIVEN
    const quizRepository = new SpyQuizRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository, spyToDoListEventBus);
    await usecase.execute('utilisateurId', 'quizId', 0, null);

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(0);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
    expect(quizRepository.marquerLeQuizArticleCommeLuAEteAppele).toBeFalsy();
  });

  it("Dans le cas d'un quiz-article et en donnant un id d'utilisateur, l'id d'une interaction valide et son pourcentage de réussite doit appeler le back pour prevenir que l'interaction a été faite et publier un evenement QUIZ_A_ETE_TERMINE pour mettre à jour le score et passer l'article comme lu", async () => {
    // GIVEN
    const quizRepository = new SpyQuizRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository, spyToDoListEventBus);
    await usecase.execute('utilisateurId', 'quizId', 0, 'articleId');

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(0);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
    expect(quizRepository.marquerLeQuizArticleCommeLuAEteAppele).toBeTruthy();
  });
});
