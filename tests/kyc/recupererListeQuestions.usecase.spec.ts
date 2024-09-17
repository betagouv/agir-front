import { RecupererListeQuestionsReponduesUsecase } from '@/domaines/kyc/recupererListeQuestionsReponduesUsecase';
import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { expect } from 'vitest';
import { ListeQuestionsPresenterImpl } from '@/domaines/kyc/adapters/listeQuestions.presenter.impl';
import { ReponseKYCSimple, ThematiqueQuestion } from '@/domaines/kyc/recupererQuestionUsecase';

describe('Fichier de tests concernant la récupération des KYC répondues', () => {
  it('doit récupérer la liste des questions KYC répondues', async () => {
    // GIVEN
    // WHEN
    const recupererListeQuestionsUsecase = new RecupererListeQuestionsReponduesUsecase(
      new MockListeQuestionsRepository([
        {
          id: 'questionId',
          libelle: 'Une question',
          type: 'libre',
          points: 10,
          reponses: {
            reponses_possibles: [],
            reponse: ['une réponse'],
          } as ReponseKYCSimple,
          thematique: ThematiqueQuestion.LOGEMENT,
          aEteRepondu: true,
        },
        {
          id: 'questionId2',
          libelle: 'Une question2',
          type: 'libre',
          points: 10,
          reponses: {
            reponses_possibles: ['1', '2', '3'],
            reponse: [],
          } as ReponseKYCSimple,
          thematique: ThematiqueQuestion.TRANSPORT,
          aEteRepondu: false,
        },
        {
          id: 'questionId3',
          libelle: 'Une question2',
          type: 'choix_multiple',
          points: 10,
          reponses: {
            reponses_possibles: ['une réponse', 'une autre réponse', 'une autre réponse2'],
            reponse: ['une réponse', 'une autre réponse'],
          } as ReponseKYCSimple,
          thematique: ThematiqueQuestion.TRANSPORT,
          aEteRepondu: true,
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
