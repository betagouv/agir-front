export interface Article {
  titre: string;
  contenu: string;
}

export interface ArticleRepository {
  recupererParId(idArticle: number): Promise<Article | null>
}
