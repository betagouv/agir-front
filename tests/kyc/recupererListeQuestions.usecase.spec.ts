import { RecupererListeQuestionsReponduesUsecase } from '@/domaines/kyc/recupererListeQuestionsRepondues.usecase';
import { MockListeQuestionsRepository } from './adapters/listequestions.repository.mock';
import { expect } from 'vitest';
import { ListeQuestionsDansLeComptePresenter } from '@/domaines/kyc/adapters/listeQuestionsDansLeCompte.presenter';
import {
  ReponseKYCSimple,
  ReponseMosaic,
  ReponseMultiple,
  ThematiqueQuestion,
} from '@/domaines/kyc/recupererQuestion.usecase';

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
            reponse: [
              {
                code: 'code',
                label: 'une réponse',
                estSelectionnee: true,
              },
              {
                code: 'code',
                label: 'une autre réponse',
                estSelectionnee: true,
              },
              {
                code: 'code',
                label: 'une autre réponse2',
                estSelectionnee: false,
              },
            ],
          } as ReponseMultiple,
          thematique: ThematiqueQuestion.TRANSPORT,
          aEteRepondu: true,
        },
        {
          id: 'questionId3',
          libelle: 'Une question2',
          type: 'mosaic_boolean',
          points: 10,
          reponses: {
            reponse: [
              {
                code: 'code',
                image_url: 'image',
                label: 'ma valeur 1',
                valeur: true,
              },
              {
                code: 'code',
                image_url: 'image',
                label: 'ma valeur 2',
                valeur: false,
              },
              {
                code: 'code',
                image_url: 'image',
                label: 'ma valeur 3',
                valeur: true,
              },
            ],
          } as ReponseMosaic<boolean>,
          thematique: ThematiqueQuestion.TRANSPORT,
          aEteRepondu: true,
        },
      ]),
    );
    await recupererListeQuestionsUsecase.execute(
      'utilisateurId',
      new ListeQuestionsDansLeComptePresenter(questionsViewModel => {
        // THEN
        expect(questionsViewModel).toStrictEqual([
          {
            id: 'questionId',
            libelle: 'Une question',
            reponse: 'une réponse',
            description:
              "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller sur les aides auxquelles vous pourriez avoir droit",
          },
          {
            id: 'questionId3',
            libelle: 'Une question2',
            reponse: 'une réponse - une autre réponse',
            description: "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité",
          },
          {
            description: "Ces informations permettent à <i>J'agis</i> de mieux vous conseiller en matière de mobilité",
            id: 'questionId3',
            libelle: 'Une question2',
            reponse: 'ma valeur 1 - ma valeur 3',
          },
        ]);
      }),
    );
  });
});
