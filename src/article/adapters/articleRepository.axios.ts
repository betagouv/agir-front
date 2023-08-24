import { AxiosFactory } from "@/axios.factory";
import { Article, ArticleRepository } from "../ports/article.repository";

interface ArticleApiModel {
  title: string,
  content: string
}

export class ArticleRepositoryAxios implements ArticleRepository {
  async recupererParId(idArticle: number): Promise<Article> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ArticleApiModel>(`/articles/${idArticle}`);

    return ({
      title: response.data.title,
      content: response.data.content
    });
  }
}
