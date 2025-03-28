import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
import { MockScoreRepository } from './adapters/score.repository.mock';
import { Badge, Gamification, TypeDeBadge } from '@/domaines/score/ports/score.repository';
import {
  GamificationPresenterImpl,
  GamificationViewModel,
} from '@/domaines/score/adapters/gamification.presenter.impl';
import { expect } from 'vitest';

describe('Fichier de test du usecase de chargement du score', () => {
  it('Cas avec score et sans badge', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(new MockScoreRepository(new Gamification(10, [])));

    // THEN
    // WHEN
    await chargementScoreUsecase.execute(
      'idUtilisateur',
      new GamificationPresenterImpl(vm => {
        expect(vm).toStrictEqual<GamificationViewModel>({
          points: 10,
          nombreDeBadges: 0,
        });
      }),
    );
  });
  it('Cas avec score et avec badge', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository(new Gamification(10, [new Badge(TypeDeBadge.PIONNIER, 'labelBadge', 'description')])),
    );

    // THEN
    // WHEN
    await chargementScoreUsecase.execute(
      'idUtilisateur',
      new GamificationPresenterImpl(vm => {
        expect(vm).toStrictEqual<GamificationViewModel>({
          points: 10,
          nombreDeBadges: 1,
        });
      }),
    );
  });
});
