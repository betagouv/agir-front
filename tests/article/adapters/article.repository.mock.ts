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
