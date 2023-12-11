import { ChargementScoreUsecase } from '@/score/chargementScore.usecase';
import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScore.presenter.impl';
import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';
import { MockScoreRepository } from './mockScoreRepository';

describe('Fichier de test du usecase de chargement du score', () => {
  it('en donnant un utilisateur valide doit me retourner de le score', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(new MockScoreRepository());
    // WHEN
    await chargementScoreUsecase.execute('dlamande', new ChargementScorePresenterImpl(expectation));
    // THEN
    function expectation(viewModel: ScoreViewModel) {
      expect(viewModel).toStrictEqual<ScoreViewModel>({
        points: 10,
        niveau: 1,
        nombreDePointsDansLeNiveau: 25,
        nombreDePointsDuNiveau: 100,
        celebration: null,
      });
    }
  });

  it("en donnant un utilisateur valide doit me retourner de le score et les célébrations/reveal s'il y en a", async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        id: 'celebrationID',
        type: 'niveau',
        titre: 'celebrationTitre',
        new_niveau: 4,
        reveal: {
          description: 'En fonction de votre situation et de où vous en êtes !',
          titre: 'Vos aides',
          url: '/vos-aides',
        },
      })
    );
    // WHEN
    await chargementScoreUsecase.execute('userAvecCelebration', new ChargementScorePresenterImpl(expectation));
    // THEN
    function expectation(viewModel: ScoreViewModel) {
      expect(viewModel).toStrictEqual<ScoreViewModel>({
        points: 10,
        niveau: 1,
        nombreDePointsDansLeNiveau: 25,
        nombreDePointsDuNiveau: 100,
        celebration: {
          id: 'celebrationID',
          type: 'niveau',
          titre: 'celebrationTitre',
          new_niveau: 4,
          reveal: {
            description: 'En fonction de votre situation et de où vous en êtes !',
            titre: 'Vos aides',
            url: '/vos-aides',
          },
        },
      });
    }
  });
});
