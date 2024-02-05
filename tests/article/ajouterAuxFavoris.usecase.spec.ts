import { AjouterAuxFavorisUsecase } from '@/article/ajouterAuxFavoris.usecase';
import { SpyArticleRepository } from './adapters/article.repository.spy';

describe('Fichier de tests pour ajouter un article aux favoris', () => {
  it('Doit appeler le repository', async () => {
    // GIVEN
    // WHEN
    const spyArticleRepository = new SpyArticleRepository();
    const usecase = new AjouterAuxFavorisUsecase(spyArticleRepository);
    await usecase.execute('1', '1');
    // THEN
    expect(spyArticleRepository.ajouterAuxFavorisAEteAppele).toBe(true);
  });
});
