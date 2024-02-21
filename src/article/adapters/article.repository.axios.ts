import { ArticleRepository } from '@/article/ports/article.repository';
import { Article } from '@/article/recupererArticle.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

export class ArticleRepositoryAxios implements ArticleRepository {
  @intercept401()
  async ajouterAuxFavoris(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_favoris',
      content_id: articleId,
    });
  }

  @intercept401()
  async retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_non_favoris',
      content_id: articleId,
    });
  }

  @intercept401()
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
  async marquerCommeLu(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_lu',
      content_id: articleId,
    });
  }

  @intercept401()
  async recuperer(utilisateurId: string, articleId: string): Promise<Article> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const article = await axiosCMS.get(
      `/articles/${articleId}?populate[0]=partenaire,partenaire.logo.media&populate[1]=sources`
    );

    const axios = AxiosFactory.getAxios();
    const articleMetaData = await axios.get(`/utilisateurs/${utilisateurId}/bibliotheque/articles/${articleId}`);
    return {
      id: articleId,
      texte: article.data.data.attributes.contenu,
      titre: article.data.data.attributes.titre,
      sousTitre: article.data.data.attributes.sousTitre,
      sources:
        article.data.data.attributes.sources?.map(source => ({
          label: source.libelle,
          url: source.lien,
        })) || null,
      partenaire: article.data.data.attributes.partenaire.data
        ? {
            id: article.data.data.attributes.partenaire.data.attributes.id,
            nom: article.data.data.attributes.partenaire.data.attributes.nom,
            logo: article.data.data.attributes.partenaire.data.attributes.logo.data[0].attributes.url,
          }
        : null,
      estEnFavori: articleMetaData.data.favoris,
    };
  }

  async previsualiser(articleId: string): Promise<Article> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const article = await axiosCMS.get(
      `/articles/${articleId}?populate[0]=partenaire,partenaire.logo.media&populate[1]=sources`
    );
    return {
      id: articleId,
      texte: article.data.data.attributes.contenu,
      titre: article.data.data.attributes.titre,
      sousTitre: article.data.data.attributes.sousTitre,
      estEnFavori: false,
      sources:
        article.data.data.attributes.sources?.map(source => ({
          label: source.libelle,
          url: source.lien,
        })) || null,
      partenaire: article.data.data.attributes.partenaire.data
        ? {
            id: article.data.data.attributes.partenaire.data.attributes.id,
            nom: article.data.data.attributes.partenaire.data.attributes.nom,
            logo: article.data.data.attributes.partenaire.data.attributes.logo.data[0].attributes.url,
          }
        : null,
    };
  }
}
