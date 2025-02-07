import { SpyArticleRepository } from './adapters/article.repository.spy';
import { ChargerArticleHorsConnexionUsecase } from '@/domaines/article/chargerArticleHorsConnexionUsecase';

describe('Fichier de tests pour previsualiser un article', () => {
  it('Doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const spyArticleRepository = new SpyArticleRepository();
    const usecase = new ChargerArticleHorsConnexionUsecase(spyArticleRepository);
    await usecase.execute('1');
    // THEN
    expect(spyArticleRepository.previsualiserAEteAppele).toBe(true);
  });
});
