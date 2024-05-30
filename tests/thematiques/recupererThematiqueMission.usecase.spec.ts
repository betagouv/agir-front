import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { ThematiqueRepositoryFake } from './adapters/recupererMissionThematique.repository.fake';
import {
  MissionThematiquePresenterImpl,
  MissionThematiqueViewModel,
} from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
import { expect } from 'vitest';

describe("Fichier de tests concernant la récupération d'une mission pour une thématique", () => {
  it('Doit récupérer une mission structurée', async () => {
    // GIVEN
    const usecase = new RecupererMissionThematiqueUsecase(new ThematiqueRepositoryFake());

    // WHEN
    await usecase.execute('1', '1', new MissionThematiquePresenterImpl(expectation));

    // THEN
    function expectation(mission) {
      expect(mission).toStrictEqual<MissionThematiqueViewModel>({
        articleEtQuiz: [
          {
            id: 'id1',
            aEteRealisee: false,
            estBloquee: false,
            hash: undefined,
            idDuContenu: '1',
            points: 10,
            progession: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            progression: 0,
            titre: 'Mission 1',
            url: '/agir/quiz/1',
            picto: '/ic_mission_article.svg',
          },
        ],
        defis: [
          {
            id: 'id2',
            aEteRealisee: false,
            estBloquee: false,
            hash: undefined,
            idDuContenu: '2',
            points: 10,
            progession: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            progression: 0,
            titre: 'Mission 2',
            url: '/defi/2',
            picto: '/ic_mission_defi.svg',
          },
        ],
        kyc: [
          {
            aEteRealisee: false,
            estBloquee: false,
            hash: null,
            id: '',
            idDuContenu: '',
            picto: '',
            points: 5,
            progression: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
            url: '/thematique/1/mieux-vous-connaitre/',
          },
        ],
        titre: 'Thematique 1',
        urlImage: 'https://via.placeholder.com/150',
      });
    }
  });
});
