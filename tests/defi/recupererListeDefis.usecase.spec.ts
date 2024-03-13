import { expect } from 'vitest';
import { ListeQuestionsPresenterImpl } from '@/kyc/adapters/listeQuestions.presenter.impl';
import { MockListeDefisRepository } from './adapters/listedefis.repository.mock';
import { RecupererListeDefisUsecase } from '@/defi/recupererListeDefis.usecase';

describe('Fichier de tests concernant la récupération des défis en cours', () => {
  it('doit récupérer la liste des défis', async () => {
    // GIVEN
    // WHEN
    const recupererListeDefisUsecase = new RecupererListeDefisUsecase(
      new MockListeDefisRepository([
        {
          id: 'defiId',
          libelle: 'Un defi',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: ['une réponse'],
        },
        {
          id: 'defiId2',
          libelle: 'Un defi2',
          type: 'libre',
          reponses_possibles: [],
          points: 10,
          reponse: [],
        },
        {
          id: 'defiId3',
          libelle: 'Un defi3',
          type: 'choix_multiple',
          reponses_possibles: [],
          points: 10,
          reponse: ['une réponse', 'une autre réponse'],
        },
      ]),
    );
    await recupererListeDefisUsecase.execute(
      'utilisateurId',
      new ListeQuestionsPresenterImpl(defisViewModel => {
        // THEN
        expect(defisViewModel).toStrictEqual([
          {
            id: 'defiId',
            libelle: 'Un defi',
            reponse: 'une réponse',
          },
          {
            id: 'defiId3',
            libelle: 'Un defi3',
            reponse: 'une réponse - une autre réponse',
          },
        ]);
      }),
    );
  });
});
