import { Article } from '@/article/recupererArticle.usecase';
import { ArticleRepository } from '@/article/ports/article.repository';

export class SpyArticleRepository implements ArticleRepository {
  private _noterArticleAEteAppele: boolean = false;
  private _noterArticleArgs: { note: 1 | 2 | 3 | 4; interactionId: string; utilisateurId: string } = {
    note: 1,
    interactionId: '',
    utilisateurId: '',
  };
  get noterArticleAEteAppele(): boolean {
    return this._noterArticleAEteAppele;
  }
  get noterArticleArgs(): { note: 1 | 2 | 3 | 4; interactionId: string; utilisateurId: string } {
    return this._noterArticleArgs;
  }

  noterArticle(interactionId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    this._noterArticleAEteAppele = true;
    this._noterArticleArgs = { interactionId, utilisateurId, note };
    return Promise.resolve();
  }
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
