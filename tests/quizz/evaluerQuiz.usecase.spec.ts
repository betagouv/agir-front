import { expect } from 'vitest';
import { EvaluerQuizUsecase } from '@/quiz/evaluerQuiz.usecase';
import { SpyQuizRepository } from './adapters/spyQuizRepository';

describe("Fichier de test concernant l'évaluation d'un quiz", () => {
  it("doit appeler le repos avec l'id utilisateur l'id du quiz et la note", async () => {
    // GIVEN
    const spyQuizRepository = new SpyQuizRepository();
    // WHEN
    const usecase = new EvaluerQuizUsecase(spyQuizRepository);
    await usecase.execute('quizId', 'utilisateurId', 3);
    // THEN
    expect(spyQuizRepository.noterQuizAEteAppele).toBe(true);
    expect(spyQuizRepository.noterQuizArgs).toEqual({
      quizId: 'quizId',
      utilisateurId: 'utilisateurId',
      note: 3,
    });
    expect(spyQuizRepository.marquerLeQuizArticleCommeLuAEteAppele).toBe(false);
  });
});
