import { DetailMission, RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
import { MissionThematiqueRepositoryMock } from './adapters/missionThematique.repository.mock';
import { MissionPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
import { expect } from 'vitest';
import { InteractionType } from '@/shell/interactionType';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

const mission: DetailMission = {
  titre: 'Thematique 1',
  clefApiThematique: ClefThematiqueAPI.alimentation,
  urlImage: 'urlImage',
  estTerminee: false,
  estTerminable: false,
  intro: 'Coucou les amis',
  missionId: '1',
  items: [],
};

const quiz = {
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
};

const defiAFaireEtNonRecommande = {
  id: 'id2',
  contentId: '2',
  titre: 'Mission 2',
  progression: 0,
  estBloquee: false,
  points: 10,
  aEteRealisee: false,
  type: InteractionType.DEFIS,
  pointAEteRecolte: false,
  estRecommande: false,
  estEnCours: false,
};

const kycs = [
  {
    id: 'id3',
    contentId: '3',
    titre: 'Mission 3',
    progression: 0,
    estBloquee: false,
    points: 10,
    aEteRealisee: true,
    type: InteractionType.KYC,
    pointAEteRecolte: false,
    estRecommande: false,
    estEnCours: false,
  },
  {
    id: 'id4',
    contentId: '4',
    titre: 'Mission 4',
    progression: 0,
    estBloquee: false,
    points: 10,
    aEteRealisee: false,
    type: InteractionType.KYC,
    pointAEteRecolte: false,
    estRecommande: false,
    estEnCours: false,
  },
];

describe("Fichier de tests concernant la récupération d'une mission", () => {
  it('doit récupérer une mission structurée', async () => {
    // GIVEN
    const usecase = new RecupererDetailMissionUsecase(
      new MissionThematiqueRepositoryMock({
        ...mission,
        items: [quiz, defiAFaireEtNonRecommande, ...kycs],
      }),
    );

    // WHEN
    await usecase.execute('1', '1', new MissionPresenterImpl(expectation));

    // THEN
    function expectation(mission) {
      expect(mission).toStrictEqual<MissionViewModel>({
        nombreEtapesMission: 4,
        estTerminee: false,
        estTerminable: false,
        intro: 'Coucou les amis',
        tag: {
          label: 'Me nourrir',
          style: {
            backgroundColor: '#E3FBAF',
            color: '#175202',
            emoji: '🍛',
          },
        },
        articleEtQuiz: [
          {
            id: 'id1',
            aEteRealisee: false,
            idDuContenu: '1',
            type: 'quiz',
          },
        ],
        kyc: {
          kycs: [
            {
              aEteRealisee: true,
              id: '3',
            },
            {
              aEteRealisee: false,
              id: '4',
            },
          ],
          progression: {
            etapeCourante: 1,
            etapeTotal: 2,
          },
        },
        titre: 'Thematique 1',
        urlImage: 'urlImage',
      });
    }
  });
});
