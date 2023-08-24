export interface Article {
  title: string;
  content: string;
}

export interface ArticleRepository {
  recupererParId(idArticle: number): Promise<Article>
}
