import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';
import { expect } from 'vitest';
import { SpyQuizRepository } from './adapters/spyQuizRepository';

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("Dans le cas d'un simple quiz et en donnant un id d'utilisateur, l'id d'une interaction et son pourcentage de réussite au quiz", async () => {
    // GIVEN
    const quizRepository = new SpyQuizRepository();

    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(quizRepository);
    await usecase.execute('utilisateurId', 'quizId', 0);

    // THEN
    expect(quizRepository.termineQuizAEteAppele).toBeTruthy();
    expect(quizRepository.score).toBe(0);
  });
});
