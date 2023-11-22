import { RecupererArticleUsecase } from '@/article/recupererArticle.usecase';
import { MockArticleRepository, SpyArticleRepository } from './adapters/article.repository.mock';
import { expect } from 'vitest';
import { PasserUnArticleCommeLuUsecase } from '@/article/passerUnArticleCommeLu.usecase';

describe("Fichier de tests concernant le marquage d'un Article comme lu", () => {
  it("En donnant un id d'interaction et un utilisateur id doit appeler la méthode marquerCommeLu", async () => {
    // GIVEN
    const spyArticleRepository = new SpyArticleRepository();
    // WHEN
    await new PasserUnArticleCommeLuUsecase(spyArticleRepository).execute('id', 'utilisateurId');
    // THEN
    expect(spyArticleRepository.marquerCommeLuAEteAppele).toBeTruthy();
  });
});
