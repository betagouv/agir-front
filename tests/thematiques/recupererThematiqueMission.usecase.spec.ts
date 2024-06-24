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
            estRecommande: undefined,
            hash: undefined,
            idDuContenu: '1',
            points: 10,
            progression: undefined,
            titre: 'Mission 1',
            url: '/quiz/alimentation/1/1',
            picto: '/ic_mission_article.svg',
            pointAEteRecolte: false,
            estEnCours: undefined,
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
            progression: undefined,
            estRecommande: true,
            titre: 'Mission 2',
            url: '/defi/alimentation/1/2',
            picto: '/ic_mission_defi.svg',
            pointAEteRecolte: false,
            estEnCours: false,
          },
        ],
        kyc: [
          {
            aEteRealisee: false,
            estBloquee: false,
            estRecommande: undefined,
            id: 'id3',
            idDuContenu: '',
            hash: undefined,
            picto: '/ic_mission_kyc.svg',
            points: 10,
            progression: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
            url: '/mieux-vous-connaitre/alimentation/1',
            pointAEteRecolte: false,
            estEnCours: undefined,
          },
        ],
        titre: 'Thematique 1',
        urlImage: 'https://via.placeholder.com/150',
        bonusMission: { phrase: 'Bonus de fin de mission', picto: 'fr-icon-gift-fill' },
      });
    }
  });
});
