import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';

export class MockArticleRepository implements ArticleRepository {
  noterArticle(interactionId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async recuperer(articleId) {
    return {
      id: articleId,
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
    };
  }
  async marquerCommeLu(interactionId, utilisateurId) {
    return;
  }
}
