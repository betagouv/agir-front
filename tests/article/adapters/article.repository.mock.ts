import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';

export class MockArticleRepository implements ArticleRepository {
  async recuperer(articleId) {
    return {
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
    };
  }
  async marquerCommeLu(interactionId, utilisateurId) {
    return;
  }
}

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
