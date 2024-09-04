import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
import { MockScoreRepository } from './adapters/score.repository.mock';
import { SauvergarderScoreSessionRepositorySpy } from './adapters/sauvergarderScore.session.repository.spy';
import { Score } from '@/domaines/score/ports/score.repository';

describe('Fichier de test du usecase de chargement du score', () => {
  it('en donnant un utilisateur valide doit demander le score et le sauvegarder', async () => {
    // GIVEN
    const sauvergarderScoreSessionRepositorySpy = new SauvergarderScoreSessionRepositorySpy();
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        points: 10,
      }),
      sauvergarderScoreSessionRepositorySpy,
    );

    // WHEN
    await chargementScoreUsecase.execute('idUtilisateur');

    // THEN

    expect(sauvergarderScoreSessionRepositorySpy.score).toStrictEqual<Score>({
      points: 10,
    });
  });
});
