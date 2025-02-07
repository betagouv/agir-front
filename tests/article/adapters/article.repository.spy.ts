import { Article } from '@/domaines/article/recupererArticle.usecase';
import { ArticleRepository } from '@/domaines/article/ports/article.repository';

export class SpyArticleRepository implements ArticleRepository {
  private _previsualiserAEteAppele: boolean = false;

  get previsualiserAEteAppele(): boolean {
    return this._previsualiserAEteAppele;
  }

  private _retirerDesFavorisAEteAppele: boolean = false;

  get retirerDesFavorisAEteAppele(): boolean {
    return this._retirerDesFavorisAEteAppele;
  }

  private _ajouterAuxFavorisAEteAppele: boolean = false;

  get ajouterAuxFavorisAEteAppele(): boolean {
    return this._ajouterAuxFavorisAEteAppele;
  }

  private _noterArticleAEteAppele: boolean = false;

  get noterArticleAEteAppele(): boolean {
    return this._noterArticleAEteAppele;
  }

  private _noterArticleArgs: { note: 1 | 2 | 3 | 4; interactionId: string; utilisateurId: string } = {
    note: 1,
    interactionId: '',
    utilisateurId: '',
  };

  get noterArticleArgs(): { note: 1 | 2 | 3 | 4; interactionId: string; utilisateurId: string } {
    return this._noterArticleArgs;
  }

  private _marquerCommeLuAEteAppele: boolean = false;

  get marquerCommeLuAEteAppele(): boolean {
    return this._marquerCommeLuAEteAppele;
  }

  recupererHorsConnexion(articleId: string): Promise<Article> {
    this._previsualiserAEteAppele = true;
    return Promise.resolve({
      id: 'articleId',
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
      estEnFavori: false,
      sources: null,
      partenaire: null,
    });
  }

  ajouterAuxFavoris(articleId: string, utilisateurId: string): Promise<void> {
    this._ajouterAuxFavorisAEteAppele = true;
    return Promise.resolve();
  }

  retirerDesFavoris(articleId: string, utilisateurId: string): Promise<void> {
    this._retirerDesFavorisAEteAppele = true;
    return Promise.resolve();
  }

  noterArticle(interactionId: string, utilisateurId: string, note: 1 | 2 | 3 | 4): Promise<void> {
    this._noterArticleAEteAppele = true;
    this._noterArticleArgs = { interactionId, utilisateurId, note };
    return Promise.resolve();
  }

  marquerCommeLu(interactionId: string, utilisateurId: string): Promise<void> {
    this._marquerCommeLuAEteAppele = true;
    return Promise.resolve();
  }

  recuperer(articleId: string): Promise<Article> {
    throw Error;
  }
}
