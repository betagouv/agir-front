import { Article, RecupererArticleUsecase } from '@/domaines/article/recupererArticle.usecase';
import { MockArticleRepository } from './adapters/article.repository.mock';
import { expect } from 'vitest';
import { SessionRepositoryMock } from '../compte/sessionRepository.mock';

describe("Fichier de tests concernant la récupération d'un Article", () => {
  it("Si utilisateur est connecté et en donnant un id d'article doit le charger", async () => {
    // GIVEN
    // WHEN
    const sessionRepository = SessionRepositoryMock.avecUtilisateurConnecte();
    expect(sessionRepository.estConnecte()).toBeTruthy();
    const article = await new RecupererArticleUsecase(new MockArticleRepository(), sessionRepository).execute(
      'articleId',
    );
    // THEN
    expect(article).toStrictEqual<Article>({
      id: 'articleId',
      texte: 'texte',
      titre: 'titre',
      sousTitre: 'sousTitre',
      estEnFavori: false,
      sources: null,
      partenaire: null,
    });
  });
  it("Si utilisateur n'est pas connecté et en donnant un id d'article doit le charger", async () => {
    // GIVEN
    // WHEN
    const article = await new RecupererArticleUsecase(
      new MockArticleRepository(),
      SessionRepositoryMock.sansUtilisateurConnecte(),
    ).execute('articleId');
    // THEN
    expect(article).toStrictEqual<Article>({
      id: 'articleId',
      texte: 'texte',
      titre: 'titre - hors connexion',
      sousTitre: 'sousTitre',
      estEnFavori: false,
      sources: null,
      partenaire: null,
    });
  });
});
