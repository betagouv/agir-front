import { ArticleRecommande, ArticleRepository } from '@/domaines/article/ports/article.repository';
import { Article } from '@/domaines/article/recupererArticle.usecase';

export class MockArticleRepository implements ArticleRepository {
  recuperer(utilisateurId: string, articleId: string): Promise<Article> {
    return Promise.resolve({
      id: articleId,
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
      sources: null,
      partenaire: null,
      estEnFavori: false,
    });
  }

  previsualiser(articleId: string): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  recupererHorsConnexion(articleId: string): Promise<Article> {
    return Promise.resolve({
      id: articleId,
      texte: 'texte',
      titre: 'titre - hors connexion',
      sousTitre: 'sousTitre',
      sources: null,
      partenaire: null,
      estEnFavori: false,
    });
  }

  retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void> {
    return Promise.resolve();
  }

  ajouterAuxFavoris(idArticle: string, idUtilisateur: string): Promise<void> {
    return Promise.resolve();
  }

  noterArticle(interactionId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    return Promise.resolve();
  }

  async marquerCommeLu(interactionId, utilisateurId) {
    return;
  }

  recupererArticlesPersonnalisees(idUtilisateur: string, nombreMax: number): Promise<ArticleRecommande[]> {
    return Promise.resolve([]);
  }
}
