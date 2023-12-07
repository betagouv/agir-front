import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
import { Quiz, QuizRepository } from '@/quiz/ports/quizRepository';
import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';
import { expect } from 'vitest';

class SpyQuizRepository implements QuizRepository {
  get score(): number {
    return this._score;
  }

  private _score: number = 0;

  get termineQuizAEteAppele(): boolean {
    return this._termineQuizAEteAppele;
  }

  private _termineQuizAEteAppele: boolean = false;

  getQuiz(id: string): Promise<Quiz> {
    throw Error;
  }

  terminerQuiz(idUtilisateur: string, idInteraction: string, score: number): Promise<void> {
    this._termineQuizAEteAppele = true;
    this._score = score;
    return Promise.resolve();
  }
}
export class SpyToDoListEventBus implements ToDoListEventBus {
  get eventName(): ToDoListEvent | null {
    return this._eventName;
  }
  private _eventName: ToDoListEvent | null = null;

  publish(eventName: ToDoListEvent): void {
    this._eventName = eventName;
  }

  subscribe(eventName: ToDoListEvent, callback: () => void): void {}
}

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
