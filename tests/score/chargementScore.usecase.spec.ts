import { ChargementScoreUsecase } from '@/score/chargementScore.usecase';
import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScore.presenter.impl';
import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';
import { MockScoreRepository } from './mockScoreRepository';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { expect } from 'vitest';
import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';

class SpyFeatuerAjouteeSessionRepository implements SessionRepository {
  get featureDebloquee(): string {
    return this._featureDebloquee;
  }
  private _featureDebloquee: string = '';
  nouvelleFeatureDebloquee(featureDebloquee: string): void {
    this._featureDebloquee = featureDebloquee;
  }

  sauvegarderUtilisateur(utilisateur: Utilisateur): void {
    return;
  }
}

describe('Fichier de test du usecase de chargement du score', () => {
  it('en donnant un utilisateur valide doit me retourner de le score', async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository(),
      new SpyFeatuerAjouteeSessionRepository(),
    );
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
        afficherMissionsTermines: false,
      });
    }
  });

  it("en donnant un utilisateur valide doit me retourner de le score et les célébrations s'il y en a", async () => {
    // GIVEN
    const spyFeatuerAjouteeSessionRepository = new SpyFeatuerAjouteeSessionRepository();
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        id: 'celebrationID',
        type: 'niveau',
        titre: 'celebrationTitre',
        new_niveau: 4,
        reveal: null,
      }),
      spyFeatuerAjouteeSessionRepository,
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
          titre: 'celebrationTitre',
          new_niveau: 4,
          reveal: null,
        },
        afficherMissionsTermines: false,
      });
    }
  });

  it("s'il y a une nouvelle feature débloquée on doit mettre à jour la Session pour la débloquer", async () => {
    // GIVEN
    const spyFeatuerAjouteeSessionRepository = new SpyFeatuerAjouteeSessionRepository();
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        id: 'celebrationID',
        type: 'niveau',
        titre: 'celebrationTitre',
        new_niveau: 4,
        reveal: {
          description: 'En fonction de votre situation et de où vous en êtes !',
          titre: 'Vos aides',
          feature: 'aides',
        },
      }),
      spyFeatuerAjouteeSessionRepository,
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
          titre: 'celebrationTitre',
          new_niveau: 4,
          reveal: {
            description: 'En fonction de votre situation et de où vous en êtes !',
            titre: 'Vos aides',
            routeName: 'vos-aides',
            feature: 'aides',
          },
        },
        afficherMissionsTermines: false,
      });
    }
    expect(spyFeatuerAjouteeSessionRepository.featureDebloquee).toBe('aides');
  });

  it('doit construire le bon reveal pour la fonctionnalité bibliothèque', async () => {
    // GIVEN
    const spyFeatuerAjouteeSessionRepository = new SpyFeatuerAjouteeSessionRepository();
    const chargementScoreUsecase = new ChargementScoreUsecase(
      new MockScoreRepository({
        id: 'celebrationID',
        type: 'niveau',
        titre: 'celebrationTitre',
        new_niveau: 4,
        reveal: {
          description: ' Découvrez la biliothèque',
          titre: 'Bibliothèque',
          feature: Fonctionnalites.BIBLIOTHEQUE,
        },
      }),
      spyFeatuerAjouteeSessionRepository,
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
            description: ' Découvrez la biliothèque',
            feature: 'bibliotheque',
            routeName: 'bibliotheque',
            titre: 'Bibliothèque',
          },
        },
      });
    }
    expect(spyFeatuerAjouteeSessionRepository.featureDebloquee).toBe('bibliotheque');
  });
});
