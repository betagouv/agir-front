import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

export class ArticleRepositoryAxios implements ArticleRepository {
  async noterArticle(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'like',
      number_value: note,
      content_id: articleId,
      content_type: 'article',
    });
  }

  @intercept401()
  async marquerCommeLu(interactionId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_lu',
      interaction_id: interactionId,
    });
  }

  async recuperer(articleId: string): Promise<Article> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const article = await axiosCMS.get(`/articles/${articleId}`);

    return {
      id: articleId,
      texte: article.data.data.attributes.contenu,
      titre: article.data.data.attributes.titre,
      sousTitre: article.data.data.attributes.sousTitre,
    };
  }
}
