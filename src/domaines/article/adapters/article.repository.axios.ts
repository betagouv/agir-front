import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ArticleRecommande, ArticleRepository } from '@/domaines/article/ports/article.repository';
import { Article } from '@/domaines/article/recupererArticle.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { InteractionType } from '@/shell/interactionType';

export interface RecommandationApiModel {
  type: string;
  titre: string;
  jours_restants: number | null;
  image_url: string;
  points: number;
  content_id: string;
  thematique_principale: string;
  status_defi: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
}

interface ArticleAPI {
  titre: string;
  soustitre: string;
  thematiques: string[];
  image_url: string;
  thematique_principale: string;
  thematique_principale_label: string;
  points: 0;
  content_id: string;
  favoris: true;
  like_level: 0;
  contenu: string;
  partenaire_nom: string;
  partenaire_url: string;
  partenaire_logo_url: string;
  sources: [
    {
      label: string;
      url: string;
    },
  ];
}

interface ArticleCMPApi {
  article: ArticleAPI;
}

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
    const axios = AxiosFactory.getAxios();
    const article = await axios.get<ArticleAPI>(`/utilisateurs/${utilisateurId}/bibliotheque/articles/${articleId}`);
    return {
      id: articleId,
      texte: article.data.contenu,
      titre: article.data.titre,
      sousTitre: article.data.soustitre,
      sources:
        article.data.sources?.map(source => ({
          label: source.label,
          url: source.url,
        })) || null,
      partenaire:
        article.data.partenaire_nom && article.data.partenaire_logo_url
          ? {
              nom: article.data.partenaire_nom,
              logo: article.data.partenaire_logo_url,
            }
          : null,
      estEnFavori: article.data.favoris,
    };
  }

  async recupererHorsConnexion(articleId: string): Promise<Article> {
    const axios = AxiosFactory.getAxios();
    const article = await axios.get(`/bibliotheque/articles/${articleId}`);

    return {
      id: articleId,
      texte: article.data.contenu,
      titre: article.data.titre,
      sousTitre: article.data.soustitre,
      sources:
        article.data.sources?.map(source => ({
          label: source.label,
          url: source.url,
        })) || null,
      partenaire:
        article.data.partenaire_nom && article.data.partenaire_logo_url
          ? {
              nom: article.data.partenaire_nom,
              logo: article.data.partenaire_logo_url,
            }
          : null,
      estEnFavori: article.data.favoris,
    };
  }

  async previsualiser(articleId: string): Promise<Article> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<ArticleCMPApi>(`/cms_preview/articles/${articleId}`);

    return {
      id: articleId,
      texte: reponse.data.article.contenu,
      titre: reponse.data.article.titre,
      sousTitre: reponse.data.article.soustitre,
      sources:
        reponse.data.article.sources?.map(source => ({
          label: source.label,
          url: source.url,
        })) || null,
      partenaire:
        reponse.data.article.partenaire_nom && reponse.data.article.partenaire_logo_url
          ? {
              nom: reponse.data.article.partenaire_nom,
              logo: reponse.data.article.partenaire_logo_url,
            }
          : null,
      estEnFavori: reponse.data.article.favoris,
    };
  }

  async recupererArticlesPersonnalisees(idUtilisateur: string, nombreMax: number): Promise<ArticleRecommande[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const params = `?nombre_max=${nombreMax}&type=article`;
    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recommandations_v3${params}`,
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: ArticleRecommande = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        clefThematiqueAPI: apiModel.thematique_principale as ClefThematiqueAPI,
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
      };

      return recommandationPersonnalisee;
    });
  }
}
