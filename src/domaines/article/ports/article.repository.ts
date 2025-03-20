import { Article } from '@/domaines/article/recupererArticle.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { InteractionType } from '@/shell/interactionType';

export interface ArticleRecommande {
  type: InteractionType;
  titre: string;
  clefThematiqueAPI: ClefThematiqueAPI;
  illustrationURL: string;
  idDuContenu: string;
}

export interface ArticleRepository {
  recuperer(utilisateurId: string, articleId: string): Promise<Article>;

  recupererHorsConnexion(articleId: string): Promise<Article>;

  previsualiser(articleId: string): Promise<Article>;

  marquerCommeLu(articleId: string, utilisateurId: string): Promise<void>;

  noterArticle(articleId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void>;

  ajouterAuxFavoris(articleId: string, utilisateurId: string): Promise<void>;

  retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void>;

  recupererArticlesPersonnalisees(idUtilisateur: string, nombreMax: number): Promise<ArticleRecommande[]>;
}
