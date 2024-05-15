import { expect } from 'vitest';
import { PasserUnArticleCommeLuUsecase } from '@/domaines/article/passerUnArticleCommeLu.usecase';
import { SpyArticleRepository } from './adapters/article.repository.spy';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { SpyToDoListEventBus } from '../toDoList/spyTodoListEventBus';

describe("Fichier de tests concernant le marquage d'un Article comme lu", () => {
  it("En donnant un id d'interaction et un utilisateur id doit appeler la méthode marquerCommeLu et publier un evenement TODO_ARTICLE_A_ETE_LU", async () => {
    // GIVEN
    const spyArticleRepository = new SpyArticleRepository();
    const spyToDoListEventBus = new SpyToDoListEventBus();
    // WHEN
    await new PasserUnArticleCommeLuUsecase(spyArticleRepository, spyToDoListEventBus).execute('id', 'utilisateurId');
    // THEN
    expect(spyArticleRepository.marquerCommeLuAEteAppele).toBeTruthy();
    expect(spyToDoListEventBus.eventName).toBe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
  });
});
