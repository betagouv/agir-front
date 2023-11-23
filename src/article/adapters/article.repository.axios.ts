import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';
import { AxiosFactory } from '@/axios.factory';

export class ArticleRepositoryAxios implements ArticleRepository {
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
      texte: article.data.data.attributes.contenu,
      titre: article.data.data.attributes.titre,
      sousTitre: article.data.data.attributes.sousTitre,
    };
  }
}
