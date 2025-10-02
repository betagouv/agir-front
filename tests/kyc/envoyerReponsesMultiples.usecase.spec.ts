import { EnvoyerReponsesMultiplesUsecase } from '@/domaines/kyc/envoyerReponsesMultiples.usecase';
import { expect } from 'vitest';
import { SpyQuestionRepository } from './adapters/question.repository.spy';

describe("Fichier de tests concernant l'envoie des reponses à une question mosaic", () => {
  it('Doit envoyer les reponses', async () => {
    // GIVEN
    const questionRepository = new SpyQuestionRepository();

    // WHEN
    const usecase = new EnvoyerReponsesMultiplesUsecase(questionRepository);
    await usecase.execute('utilisateurId', 'questionId', [
      {
        code: 'code',
        boolean_value: true,
      },
    ]);

    // THEN
    expect(questionRepository.envoyerReponseMosaicArgs).toEqual({
      utilisateurId: 'utilisateurId',
      questionId: 'questionId',
      reponses: [
        {
          code: 'code',
          boolean_value: true,
        },
      ],
    });
  });
});
