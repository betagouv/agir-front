import { Article, RecupererArticleUsecase } from '@/article/recupererArticle.usecase';
import { MockArticleRepository } from './adapters/article.repository.mock';
import { expect } from 'vitest';

describe("Fichier de tests concernant la récupération d'un Article", () => {
  it("En donnant un id d'article doit le charger", async () => {
    // GIVEN
    // WHEN
    const article = await new RecupererArticleUsecase(new MockArticleRepository()).execute('id', 'articleId');
    // THEN
    expect(article).toStrictEqual<Article>({
      id: 'articleId',
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
      estEnFavori: false,
    });
  });
});
