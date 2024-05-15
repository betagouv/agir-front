import { EvaluerArticleUsecase } from '../../../src/domaines/article/evaluerArticle.usecase';
import { SpyArticleRepository } from './article.repository.spy';
import { expect } from 'vitest';

describe("Fichier de test concernant l'évaluation d'un article", () => {
  it("doit appeler le repos avec l'id utilisaeur l'id de l'article et la note", async () => {
    // GIVEN
    // WHEN
    const spyArticleRepository = new SpyArticleRepository();
    const usecase = new EvaluerArticleUsecase(spyArticleRepository);
    await usecase.execute('interactionId', 'utilisateurId', 3);
    // THEN
    expect(spyArticleRepository.noterArticleAEteAppele).toBe(true);
    expect(spyArticleRepository.noterArticleArgs).toEqual({
      interactionId: 'interactionId',
      utilisateurId: 'utilisateurId',
      note: 3,
    });
  });
});
