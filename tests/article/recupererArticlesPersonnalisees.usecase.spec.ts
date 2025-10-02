import { RecupererArticlesPersonnaliseesUsecase } from '@/domaines/article/recupererArticlesPersonnalisees.usecase';
import {
  ArticleRecommandeViewModel,
  ArticlesRecommandesPresenterImpl,
} from '@/domaines/article/adapters/articlesRecommandes.presenter.impl';
import { MockArticleRepository } from './adapters/article.repository.mock';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

describe('Fichier de tests concernant le chargement des articles recommandées', () => {
  it('En donnant un id utilisateur doit charger et mettre en forme les articles personnalisées', async () => {
    // GIVEN
    const usecase = new RecupererArticlesPersonnaliseesUsecase(
      new MockArticleRepository([
        {
          idDuContenu: '1',
          illustrationURL: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          estLocal: true,
        },
      ]),
    );

    // WHEN
    await usecase.execute('1', 4, new ArticlesRecommandesPresenterImpl(expectation));

    // THEN
    function expectation(articlesRecommandes: ArticleRecommandeViewModel[]) {
      expect(articlesRecommandes).toStrictEqual<ArticleRecommandeViewModel[]>([
        {
          id: '1',
          image: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          url: '/article/article-qui-doit-etre-en-avant/1',
          estLocal: true,
        },
      ]);
    }
  });

  it('En donnant un id utilisateur et une thématique, doit charger et mettre en forme les articles personnalisées', async () => {
    // GIVEN
    const usecase = new RecupererArticlesPersonnaliseesUsecase(
      new MockArticleRepository([
        {
          idDuContenu: '1',
          illustrationURL: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          clefThematiqueAPI: ClefThematiqueAPI.consommation,
          estLocal: false,
        },
      ]),
    );

    // WHEN
    await usecase.execute('1', 4, new ArticlesRecommandesPresenterImpl(expectation), ClefThematiqueAPI.consommation);

    // THEN
    function expectation(articlesRecommandes: ArticleRecommandeViewModel[]) {
      expect(articlesRecommandes).toStrictEqual<ArticleRecommandeViewModel[]>([
        {
          id: '1',
          image: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          url: '/article/article-qui-doit-etre-en-avant/1',
          estLocal: false,
        },
      ]);
    }
  });
});
