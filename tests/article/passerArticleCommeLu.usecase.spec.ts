import { expect } from 'vitest';
import { PasserUnArticleCommeLuUsecase } from '@/article/passerUnArticleCommeLu.usecase';
import { SpyArticleRepository } from './adapters/article.repository.spy';

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
