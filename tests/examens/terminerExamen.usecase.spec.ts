import { TerminerExamenUsecase } from '@/domaines/examens/terminerExamen.usecase';
import { SpyMissionEventBus } from '../missions/adapters/spyMissionEventBus';
import { ScoreExamenPresenterImpl, ScoreExamenViewModel } from '@/domaines/examens/adapters/scoreExamen.presenter.impl';
import { ExamenRepositoryMock } from './adapters/examen.repository.mock';
import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';

describe('Fichier de tests concernant les examens (quiz)', () => {
  it('doit renvoyer 100% et une phrase de félicitations quand le quiz est 100% réussi', async () => {
    // GIVEN
    const repository = new ExamenRepositoryMock({ pourcentageDeReussite: 100 });
    const spyMissionEventBus = new SpyMissionEventBus();

    // WHEN
    const usecase = new TerminerExamenUsecase(repository, spyMissionEventBus);
    await usecase.execute('1', '1', new ScoreExamenPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ScoreExamenViewModel) {
      expect(viewModel).toStrictEqual<ScoreExamenViewModel>({
        pourcentageDeReussite: '100 %',
        phrase:
          'Bravo ! Nous espérons que ce quiz vous a permis de mieux comprendre l’impact de nos habitudes et vous a donné envie d’agir.',
      });
    }
    expect(spyMissionEventBus.eventName).toBe(MissionEvent.MISSION_TERMINEE);
  });

  it("doit renvoyer le cas d'un pourcentage de réussite inférieur ou égal à 50% et une phrase de félicitations", async () => {
    // GIVEN
    const repository = new ExamenRepositoryMock({ pourcentageDeReussite: 40 });
    const spyMissionEventBus = new SpyMissionEventBus();

    // WHEN
    const usecase = new TerminerExamenUsecase(repository, spyMissionEventBus);
    await usecase.execute('1', '1', new ScoreExamenPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ScoreExamenViewModel) {
      expect(viewModel).toStrictEqual<ScoreExamenViewModel>({
        pourcentageDeReussite: '40 %',
        phrase:
          'Vous avez compris les grands enjeux ! Retrouvez les articles sur le sujet dans votre bibliothèque, et n’hésitez pas à consulter les sources renseignées pour en savoir plus.',
      });
    }
    expect(spyMissionEventBus.eventName).toBe(MissionEvent.MISSION_TERMINEE);
  });

  it('doit renvoyer le cas où toutes les réponses sont fausses et une phrase', async () => {
    // GIVEN
    const repository = new ExamenRepositoryMock({ pourcentageDeReussite: 0 });
    const spyMissionEventBus = new SpyMissionEventBus();

    // WHEN
    const usecase = new TerminerExamenUsecase(repository, spyMissionEventBus);
    await usecase.execute('1', '1', new ScoreExamenPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ScoreExamenViewModel) {
      expect(viewModel).toStrictEqual<ScoreExamenViewModel>({
        pourcentageDeReussite: '0 %',
        phrase: 'Nous espérons que ce quiz vous a permis de mieux comprendre l’impact de nos habitudes.',
      });
    }
    expect(spyMissionEventBus.eventName).toBe(MissionEvent.MISSION_TERMINEE);
  });
});
