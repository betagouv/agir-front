import { ArticleRepository } from '@/article/ports/article.repository';
import { ToDoListEvent, ToDoListEventBus } from '@/toDoList/toDoListEventBusImpl';

export class PasserUnArticleCommeLuUsecase {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly todoListEventBus: ToDoListEventBus
  ) {}

  async execute(interactionId: string, utilisateurId: string): Promise<void> {
    await this.articleRepository.marquerCommeLu(interactionId, utilisateurId);
    this.todoListEventBus.publish(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
  }
}
