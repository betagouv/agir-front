import { Article } from '@/article/recupererArticle.usecase';
import { ArticleRepository } from '@/article/ports/article.repository';

export class SpyArticleRepository implements ArticleRepository {
  get marquerCommeLuAEteAppele(): boolean {
    return this._marquerCommeLuAEteAppele;
  }
  private _marquerCommeLuAEteAppele: boolean = false;
  marquerCommeLu(interactionId: string, utilisateurId: string): Promise<void> {
    this._marquerCommeLuAEteAppele = true;
    return Promise.resolve();
  }

  recuperer(articleId: string): Promise<Article> {
    throw Error;
  }
}
