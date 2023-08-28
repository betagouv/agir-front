import { ObtenirArticleUsecase } from '../../src/article/obtenirArticle.usecase';
import { Article, ArticleRepository } from '../../src/article/ports/article.repository';

class ArticleRepositoryForTest implements ArticleRepository {
  recupererParId(idArticle): Promise<Article | null> {
    if (idArticle === '0') return Promise.resolve(null);

    return Promise.resolve({
      titre: 'Titre de mon article',
      contenu: '<p>Lorem ipsum dolor <em>test</em></p>'
    })
  }  
}

describe('Fichier de tests concernant la récupération des articles', () => {
  describe("Quand l'article existe", () => {
    it("En donnant l'id d'un article doit retourner cet article", async () => {
      // GIVEN
      const idArticle = 'article-id';
  
      // WHEN
      const obtenirArticleUsecase = new ObtenirArticleUsecase(new ArticleRepositoryForTest());
      const article = await obtenirArticleUsecase.execute(idArticle);
  
      // THEN
      expect(article).toStrictEqual({
        titre: 'Titre de mon article',
        contenu: '<p>Lorem ipsum dolor <em>test</em></p>'
      })
    });
  });

  describe("Quand l'article n'existe pas", () => {
    it("En donnant l'id d'un article doit retourner null", async () => {
      // GIVEN
      const idArticle = '0';
  
      // WHEN
      const obtenirArticleUsecase = new ObtenirArticleUsecase(new ArticleRepositoryForTest());
      const article = await obtenirArticleUsecase.execute(idArticle);
  
      // THEN
      expect(article).toBeNull();
    });
  });
});
