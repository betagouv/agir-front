import { expect } from 'vitest';
import { PasserUnArticleCommeLuUsecase } from '@/article/passerUnArticleCommeLu.usecase';
import { SpyArticleRepository } from './adapters/article.repository.spy';
import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';

class SpyToDoListEventBus implements ToDoListEventBus {
  get publishAEteAppele(): boolean {
    return this._publishAEteAppele;
  }
  get eventName(): ToDoListEvent {
    return this._eventName;
  }
  private _publishAEteAppele = false;
  private _eventName: ToDoListEvent = ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE;

  subscribe(eventName: ToDoListEvent, callback: () => void): void {}

  publish(eventName: ToDoListEvent): void {
    this._publishAEteAppele = true;
    this._eventName = eventName;
  }
}

describe("Fichier de tests concernant le marquage d'un Article comme lu", () => {
  it("En donnant un id d'interaction et un utilisateur id doit appeler la méthode marquerCommeLu et publier un evenement TODO_ARTICLE_A_ETE_LU", async () => {
    // GIVEN
    const spyArticleRepository = new SpyArticleRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    await new PasserUnArticleCommeLuUsecase(spyArticleRepository, spyToDoListEventBus).execute('id', 'utilisateurId');
    // THEN
    expect(spyArticleRepository.marquerCommeLuAEteAppele).toBeTruthy();
    expect(spyToDoListEventBus.publishAEteAppele).toBeTruthy();
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
  });
});
