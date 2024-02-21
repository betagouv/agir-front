import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { expect } from 'vitest';
import { SpyToDoListEventBus } from '../toDoList/spyTodoListEventBus';
import { SpyQuizRepository } from './adapters/spyQuizRepository';

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("En donnant un id d'utilisateur, l'id d'une interaction valide dans le cas d'un quiz doit calucler le score  doit appeler le back pour prevenir que l'interaction a été faite et publier un evenement QUIZ_A_ETE_TERMINE pour mettre à jour le score", async () => {
    // GIVEN
    const quizRepository = new SpyQuizRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository, spyToDoListEventBus);
    await usecase.execute('1', '2', 2, 5);

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(40);
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
  });
});
