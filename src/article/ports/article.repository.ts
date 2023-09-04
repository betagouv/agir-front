export interface Article {
  titre: string;
  contenu: string;
}

export interface ArticleRepository {
  recupererParId(idArticle: string): Promise<Article | null>
}
