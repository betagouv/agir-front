import { RecupererListeQuestionsUsecase } from '@/kyc/recupererListeQuestions.usecase';
import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { expect } from 'vitest';
import { ListeQuestionsPresenterImpl } from '@/kyc/adapters/listeQuestions.presenter.impl';

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
        },
        {
          id: 'questionId2',
          libelle: 'Une question2',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: [],
        },
        {
          id: 'questionId3',
          libelle: 'Une question2',
          type: 'choix_multiple',
          reponses_possibles: [],
          points: 10,
          reponse: ['une réponse', 'une autre réponse'],
        },
      ])
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
          },
          {
            id: 'questionId3',
            libelle: 'Une question2',
            reponse: 'une réponse - une autre réponse',
          },
        ]);
      })
    );
  });
});
