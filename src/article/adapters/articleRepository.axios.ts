import { AxiosFactory } from "@/axios.factory";
import { Article, ArticleRepository } from "../ports/article.repository";

interface ArticleApiModel {
  titre: string,
  contenu: string
}

export class ArticleRepositoryAxios implements ArticleRepository {
  async recupererParId(idArticle: number): Promise<Article | null> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ArticleApiModel>(`/articles/${idArticle}`);

    if (response.data.titre !== '') return null;

    return ({
      titre: response.data.titre,
      contenu: response.data.contenu
    });
  }
}
