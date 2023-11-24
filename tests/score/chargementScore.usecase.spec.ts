import { ChargementScoreUsecase } from '@/score/chargementScore.usecase';
import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScore.presenter.impl';
import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';
import { ScoreRepositoryRetourneUneValeur } from './dashboardRepository.retourneUneValeur';

describe('Fichier de test du usecase de chargement du score', () => {
  it('en donnant un utilisateur valide doit me retourner de le score', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(new ScoreRepositoryRetourneUneValeur(10));
    // WHEN
    await chargementScoreUsecase.execute('dlamande', new ChargementScorePresenterImpl(expectation));
    // THEN
    function expectation(viewModel: ScoreViewModel) {
      expect(viewModel).toStrictEqual<ScoreViewModel>({
        score: 10,
      });
    }
  });
});
