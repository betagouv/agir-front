import { DetailMission, RecupererDetailMissionUsecase } from '@/domaines/missions/recupererDetailMission.usecase';
import { MissionThematiqueRepositoryMock } from './adapters/missionThematique.repository.mock';
import {
  MissionDefiViewModel,
  MissionPresenterImpl,
  MissionViewModel,
} from '@/domaines/missions/adapters/mission.presenter.impl';
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
        defis: [
          {
            id: 'id2',
            aEteRealisee: false,
            badge: undefined,
            couleurBordure: '',
            titre: 'Mission 2',
            url: '/thematique/me-nourrir/mission/1/defi/2',
            link: {
              style: '',
              title: 'Aller au défi : Mission 2',
              label: 'Aller au défi',
            },
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

  describe('quand un défi est en cours', () => {
    it("doit récupérer un tag 'En cours !'", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estEnCours: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'En cours !',
          style: 'background--green-light text--black',
        });
      }
    });

    it("doit récupérer un tag 'En cours !' même si le défi est recommandé", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estEnCours: true, estRecommande: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'En cours !',
          style: 'background--green-light text--black',
        });
      }
    });

    it('doit récupérer une couleur de bordure', async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estEnCours: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--green-light',
        );
      }
    });

    it('doit récupérer une couleur de bordure même si le défi est recommandé', async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estEnCours: true, estRecommande: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--green-light',
        );
      }
    });

    it("doit récupérer un lien pour reprendre le défi s'il n'a pas été réalisé", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [
            { ...defiAFaireEtNonRecommande, estEnCours: true, aEteRealisee: true },
            { ...defiAFaireEtNonRecommande, estEnCours: true, aEteRealisee: false },
            ...kycs,
          ],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[1].link).toStrictEqual<MissionDefiViewModel['link']>({
          label: 'Reprendre le défi',
          style: 'fr-btn--secondary',
          title: 'Reprendre le défi : Mission 2',
        });
      }
    });
  });

  describe('quand un défi est recommandé', () => {
    it("doit récupérer un tag 'Recommandé' si le défi n'est pas réalisé", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estRecommande: true, aEteRealisee: false }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('1', '1', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'Recommandé',
          style: 'background--bleu-info-dark text--white',
        });
      }
    });

    it("doit récupérer une couleur de bordure si le défi n'est pas réalisé", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estRecommande: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--bleu-info-dark',
        );
      }
    });
  });

  describe('quand un défi est terminé', () => {
    it("doit récupérer un tag 'Terminé' si le défi a été réalisé", async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estRecommande: true, aEteRealisee: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('1', '1', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'Terminé !',
          style: 'background--vert--success text--white',
        });
      }
    });

    it('doit récupérer une couleur de bordure a été réalisé', async () => {
      // GIVEN
      const usecase = new RecupererDetailMissionUsecase(
        new MissionThematiqueRepositoryMock({
          ...mission,
          items: [{ ...defiAFaireEtNonRecommande, estRecommande: true }, ...kycs],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionPresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--bleu-info-dark',
        );
      }
    });
  });
});
