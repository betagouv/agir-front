import { RecupererMissionThematiqueUsecase } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { MissionThematiqueRepositoryMock } from './adapters/missionThematique.repository.mock';
import {
  MissionDefiViewModel,
  MissionThematiquePresenterImpl,
  MissionThematiqueViewModel,
} from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
import { expect } from 'vitest';
import { InteractionType } from '@/shell/interactionType';

const thematique = {
  titre: 'Thematique 1',
  univers: 'alimentation',
  urlImage: 'urlImage',
  estTerminee: false,
  idThematique: '1',
  progressionKyc: {
    etapeCourante: 1,
    etapeTotal: 2,
  },
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

const defi = {
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

const kyc = {
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
};

describe("Fichier de tests concernant la récupération d'une mission pour une thématique", () => {
  it('doit récupérer une mission structurée', async () => {
    // GIVEN
    const usecase = new RecupererMissionThematiqueUsecase(
      new MissionThematiqueRepositoryMock({
        ...thematique,
        items: [quiz, defi, kyc],
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
            idDuContenu: '1',
            points: 10,
            titre: 'Mission 1',
            url: '/quiz/alimentation/1/1',
            picto: '/ic_mission_article.svg',
            pointAEteRecolte: false,
          },
        ],
        defis: [
          {
            id: 'id2',
            aEteRealisee: false,
            estBloquee: false,
            couleurBordure: '',
            points: 10,
            badge: undefined,
            titre: 'Mission 2',
            url: '/defi/alimentation/1/2',
            picto: '/ic_mission_defi.svg',
            pointAEteRecolte: false,
            link: {
              style: '',
              title: "Aller à l'action : Mission 2",
              label: "Aller à l'action",
            },
          },
        ],
        kyc: [
          {
            aEteRealisee: false,
            estBloquee: false,
            id: 'id3',
            picto: '/ic_mission_kyc.svg',
            points: 10,
            progression: {
              etapeCourante: 1,
              etapeTotal: 2,
            },
            titre: '<strong>Quelques questions</strong> pour mieux vous connaître',
            url: '/mieux-vous-connaitre/alimentation/1',
            pointAEteRecolte: false,
          },
        ],
        titre: 'Thematique 1',
        urlImage: 'urlImage',
      });
    }
  });

  describe('quand un défi est en cours', () => {
    it("doit récupérer un tag 'En cours !'", async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [{ ...defi, estEnCours: true }, kyc],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'En cours !',
          style: 'background--green-light text--black',
        });
      }
    });

    it("doit récupérer un tag 'En cours !' même si le défi est recommandé", async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [{ ...defi, estEnCours: true, estRecommande: true }, kyc],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'En cours !',
          style: 'background--green-light text--black',
        });
      }
    });

    it('doit récupérer une couleur de bordure', async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [{ ...defi, estEnCours: true }, kyc],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--green-light',
        );
      }
    });

    it('doit récupérer une couleur de bordure même si le défi est recommandé', async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [{ ...defi, estEnCours: true, estRecommande: true }, kyc],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--green-light',
        );
      }
    });

    it("doit récupérer un lien pour reprendre le défi s'il n'a pas été réalisé", async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [
            { ...defi, estEnCours: true, aEteRealisee: true },
            { ...defi, estEnCours: true, aEteRealisee: false },
            kyc,
          ],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].link).toBeUndefined();
        expect(mission.defis[1].link).toStrictEqual<MissionDefiViewModel['link']>({
          label: "Reprendre l'action",
          style: 'fr-btn--secondary',
          title: "Reprendre l'action : Mission 2",
        });
      }
    });
  });

  describe('quand un défi est recommandé', () => {
    it("doit récupérer un tag 'Recommandé' si le défi n'est pas réalisé", async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [
            { ...defi, estRecommande: true, aEteRealisee: true },
            { ...defi, estRecommande: true, aEteRealisee: false },
            kyc,
          ],
        }),
      );

      // WHEN
      await usecase.execute('1', '1', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].badge).toBeUndefined();
        expect(mission.defis[1].badge).toStrictEqual<MissionDefiViewModel['badge']>({
          label: 'Recommandé',
          style: 'background--bleu-info-dark text--white',
        });
      }
    });

    it("doit récupérer une couleur de bordure si le défi n'est pas réalisé", async () => {
      // GIVEN
      const usecase = new RecupererMissionThematiqueUsecase(
        new MissionThematiqueRepositoryMock({
          ...thematique,
          items: [{ ...defi, estRecommande: true, aEteRealisee: true }, { ...defi, estRecommande: true }, kyc],
        }),
      );

      // WHEN
      await usecase.execute('thematiqueId', 'utilisateurId', new MissionThematiquePresenterImpl(expectation));

      // THEN
      function expectation(mission: MissionThematiqueViewModel) {
        expect(mission.defis[0].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>('');
        expect(mission.defis[1].couleurBordure).toStrictEqual<MissionDefiViewModel['couleurBordure']>(
          'border--bleu-info-dark',
        );
      }
    });
  });
});
