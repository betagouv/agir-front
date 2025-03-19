import { SpyArticleRepository } from './adapters/article.repository.spy';
import { PrevisualiserArticleUsecase } from '@/domaines/article/previsualiserArticle.usecase';

describe('Fichier de tests pour previsualiser un article', () => {
  it('Doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const spyArticleRepository = new SpyArticleRepository();
    const usecase = new PrevisualiserArticleUsecase(spyArticleRepository);
    await usecase.execute('1');
    // THEN
    expect(spyArticleRepository.previsualiserAEteAppele).toBe(true);
  });
});
