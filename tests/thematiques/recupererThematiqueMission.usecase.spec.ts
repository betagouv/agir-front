import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { MissionThematiqueRepositoryMock } from './adapters/missionThematique.repository.mock';
import {
  MissionThematiquePresenterImpl,
  MissionThematiqueViewModel,
} from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
import { expect } from 'vitest';
import { InteractionType } from '@/shell/interactionType';

describe("Fichier de tests concernant la récupération d'une mission pour une thématique", () => {
  it('Doit récupérer une mission structurée', async () => {
    // GIVEN
    const usecase = new RecupererMissionThematiqueUsecase(
      new MissionThematiqueRepositoryMock({
        titre: 'Thematique 1',
        univers: 'alimentation',
        urlImage: 'https://via.placeholder.com/150',
        estTerminee: false,
        items: [
          {
            id: 'id1',
            contentId: '1',
            titre: 'Mission 1',
            progression: 0,
            estBloquee: false,
            points: 10,
            aEteRealisee: false,
            type: InteractionType.QUIZ,
            pointAEteRecolte: false,
            estRecommande: false,
            estEnCours: false,
          },
          {
            id: 'id2',
            contentId: '2',
            titre: 'Mission 2',
            progression: 0,
            estBloquee: false,
            points: 10,
            aEteRealisee: false,
            type: InteractionType.DEFIS,
            pointAEteRecolte: false,
            estRecommande: true,
            estEnCours: false,
          },
          {
            id: 'id3',
            contentId: '3',
            titre: 'Mission 3',
            progression: 0,
            estBloquee: false,
            points: 10,
            aEteRealisee: false,
            type: InteractionType.KYC,
            pointAEteRecolte: false,
            estRecommande: false,
            estEnCours: false,
          },
        ],
        idThematique: '1',
        progressionKyc: {
          etapeCourante: 1,
          etapeTotal: 2,
        },
      }),
    );

    // WHEN
    await usecase.execute('1', '1', new MissionThematiquePresenterImpl(expectation));

    // THEN
    function expectation(mission) {
      expect(mission).toStrictEqual<MissionThematiqueViewModel>({
        estTerminee: false,
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
      });
    }
  });
});
