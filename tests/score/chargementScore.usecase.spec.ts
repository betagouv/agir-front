import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
import { MockScoreRepository } from './adapters/score.repository.mock';
import { Badge, Gamification, TypeDeBadge } from '@/domaines/score/ports/score.repository';
import {
  GamificationPresenterImpl,
  GamificationViewModel,
} from '@/domaines/score/adapters/gamification.presenter.impl';
import { expect } from 'vitest';
import { NombreAfficheEnFR } from '@/shell/formatting/nombreAfficheEnFRBuilder';

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
          points: '10' as NombreAfficheEnFR,
          nombreDeBadges: undefined,
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
          points: '10' as NombreAfficheEnFR,
          nombreDeBadges: '1' as NombreAfficheEnFR,
        });
      }),
    );
  });
});
