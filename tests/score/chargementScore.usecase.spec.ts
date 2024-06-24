import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
import { ChargementScorePresenterImpl } from '@/domaines/score/adapters/chargementScore.presenter.impl';
import { ScoreViewModel } from '@/domaines/score/ports/chargementScore.presenter';
import { MockScoreRepository } from './adapters/score.repository.mock';

describe('Fichier de test du usecase de chargement du score', () => {
  it('en donnant un utilisateur valide doit me retourner de le score', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        niveau: 1,
        nombreDePointsDuNiveau: 100,
        nombreDePointsDansLeNiveau: 25,
        points: 10,
      }),
    );

    // WHEN
    await chargementScoreUsecase.execute('idUtilisateur', new ChargementScorePresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ScoreViewModel) {
      expect(viewModel).toStrictEqual<ScoreViewModel>({
        points: 10,
        niveau: 1,
        nombreDePointsDansLeNiveau: 25,
        nombreDePointsDuNiveau: 100,
      });
    }
  });
});
