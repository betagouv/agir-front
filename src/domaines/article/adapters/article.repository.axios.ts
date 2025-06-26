import { AxiosFactory, intercept40X } from '@/axios.factory';
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
  is_local: boolean;
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
  @intercept40X()
  async ajouterAuxFavoris(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_favoris',
      content_id: articleId,
    });
  }

  @intercept40X()
  async retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_non_favoris',
      content_id: articleId,
    });
  }

  @intercept40X()
  async noterArticle(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'like',
      number_value: note,
      content_id: articleId,
      content_type: 'article',
    });
  }

  @intercept40X()
  async marquerCommeLu(articleId: string, utilisateurId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/events`, {
      type: 'article_lu',
      content_id: articleId,
    });
  }

  @intercept40X()
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
      image: article.data.image_url,
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
      image: article.data.image_url,
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
      image: reponse.data.article.image_url,
    };
  }

  async recupererArticlesPersonnalisees(
    idUtilisateur: string,
    nombreMax: number,
    thematique?: ClefThematiqueAPI,
  ): Promise<ArticleRecommande[]> {
    const axiosInstance = AxiosFactory.getAxios();

    const params: Record<string, string | number> = {
      type: 'article',
      nombre_max: nombreMax,
    };
    if (thematique) {
      params.thematique = thematique;
    }

    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recommandations_v3`,
      { params },
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: ArticleRecommande = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        clefThematiqueAPI: apiModel.thematique_principale as ClefThematiqueAPI,
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
        estLocal: apiModel.is_local,
      };

      return recommandationPersonnalisee;
    });
  }
}
