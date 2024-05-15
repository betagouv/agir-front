import { RecupererListeQuestionsUsecase } from '@/domaines/kyc/recupererListeQuestions.usecase';
import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { expect } from 'vitest';
import { ListeQuestionsPresenterImpl } from '@/domaines/kyc/adapters/listeQuestions.presenter.impl';
import { ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

describe('Fichier de tests concernant la récupération des KYC répondues', () => {
  it('doit récupérer la liste des questions KYC répondues', async () => {
    // GIVEN
    // WHEN
    const recupererListeQuestionsUsecase = new RecupererListeQuestionsUsecase(
      new MockListeQuestionsRepository([
        {
          id: 'questionId',
          libelle: 'Une question',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: ['une réponse'],
          thematique: ThematiqueQuestion.LOGEMENT,
        },
        {
          id: 'questionId2',
          libelle: 'Une question2',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: [],
          thematique: ThematiqueQuestion.TRANSPORT,
        },
        {
          id: 'questionId3',
          libelle: 'Une question2',
          type: 'choix_multiple',
          reponses_possibles: [],
          points: 10,
          reponse: ['une réponse', 'une autre réponse'],
          thematique: ThematiqueQuestion.TRANSPORT,
        },
      ]),
    );
    await recupererListeQuestionsUsecase.execute(
      'utilisateurId',
      new ListeQuestionsPresenterImpl(questionsViewModel => {
        // THEN
        expect(questionsViewModel).toStrictEqual([
          {
            id: 'questionId',
            libelle: 'Une question',
            reponse: 'une réponse',
            description:
              'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller sur les aides auxquelles vous pourriez avoir droit',
          },
          {
            id: 'questionId3',
            libelle: 'Une question2',
            reponse: 'une réponse - une autre réponse',
            description:
              'Ces informations permettent à <span class="text--italic">Agir</span> de mieux vous conseiller en matière de mobilité',
          },
        ]);
      }),
    );
  });
});
