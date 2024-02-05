import { SpyArticleRepository } from './adapters/article.repository.spy';
import { RetirerDesFavorisUsecase } from '@/article/retirerDesFavoris.usecase';

describe('Fichier de tests pour retirer un article des favoris', () => {
  it('Doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const spyArticleRepository = new SpyArticleRepository();
    const usecase = new RetirerDesFavorisUsecase(spyArticleRepository);
    await usecase.execute('1', '1');
    // THEN
    expect(spyArticleRepository.retirerDesFavorisAEteAppele).toBe(true);
  });
});
