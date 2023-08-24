import { ObtenirArticleUsecase } from '../../src/article/obtenirArticle.usecase';
import { Article, ArticleRepository } from '../../src/article/ports/article.repository';

class ArticleRepositoryForTest implements ArticleRepository {
  recupererParId(): Promise<Article> {
    return Promise.resolve({
      title: 'Titre de mon article',
      content: '<p>Lorem ipsum dolor <em>test</em></p>'
    })
  }  
}

describe('Fichier de tests concernant la récupération des articles', () => {
  it("En donnant l'id d'un article doit retourner cet article", async () => {
    // GIVEN
    const idArticle = 1;

    // WHEN
    const obtenirArticleUsecase = new ObtenirArticleUsecase(new ArticleRepositoryForTest());
    const article = await obtenirArticleUsecase.execute(idArticle);

    // THEN
    expect(article).toStrictEqual({
      title: 'Titre de mon article',
      content: '<p>Lorem ipsum dolor <em>test</em></p>'
    })
  });
});
