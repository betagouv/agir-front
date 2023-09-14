import { AxiosFactory } from "@/axios.factory";

export interface ArticleCMS {
  texte: string;
  titre: string;
  sousTitre: string
}
export class ChargerContenuCms {
  async charger(articleId: string): Promise<ArticleCMS> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const article = await axiosCMS.get(`/articles/${articleId}`);

    return {
      texte: article.data.data.attributes.contenu,
      titre: article.data.data.attributes.titre,
      sousTitre: article.data.data.attributes.sousTitre
    };
  }
}
