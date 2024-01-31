import { ArticleRepository } from '@/article/ports/article.repository';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class PasserUnArticleCommeLuUsecase {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly todoListEventBus: EventBus<ToDoListEvent>
  ) {}

  async execute(articleId: string, utilisateurId: string): Promise<void> {
    await this.articleRepository.marquerCommeLu(articleId, utilisateurId);
    this.todoListEventBus.publish(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
  }
}
