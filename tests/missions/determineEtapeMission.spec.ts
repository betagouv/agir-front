import { expect } from 'vitest';
import { determineEtapeMission } from '@/domaines/missions/determineEtapeMission';
import {
  MissionBaseViewModel,
  MissionQuizArticleViewModel,
  MissionViewModel,
} from '@/domaines/missions/adapters/mission.presenter.impl';

describe('Determine les étapes', () => {
  // GIVEN
  const viewModelBase = {
    titre: 'Titre de ma mission',
    urlImage: '/urlImage.png',
    estTerminable: false,
    estTerminee: false,
    intro: 'Ceci est une intro',
    nombreEtapesMission: 2,
    kyc: {
      progression: {
        etapeCourante: 0,
        etapeTotal: 3,
      },
      kycs: [
        {
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: false,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
      ],
    },
    tag: {
      label: 'Mon tag',
      style: {
        backgroundColor: 'red',
        color: 'blue',
        emoji: ':)',
      },
    },
    articleEtQuiz: [],
    defis: [],
  };

  it("quand la mission est terminée, retourne à l'introduction", () => {
    // GIVEN
    const viewModel: MissionViewModel = {
      ...viewModelBase,
      estTerminee: true,
    };

    // WHEN
    const etapeMission = determineEtapeMission(viewModel);

    // THEN
    expect(etapeMission).toStrictEqual({ etat: 'INTRO', indexEtape: 0 });
  });

  describe("Quand la mission n'est pas terminée", () => {
    it("et qu'aucune KYC n'a été réalisée, retourne à l'introduction", () => {
      // GIVEN
      const viewModel: MissionViewModel = {
        ...viewModelBase,
        kyc: {
          progression: {
            etapeCourante: 0,
            etapeTotal: 3,
          },
          kycs: [] as MissionBaseViewModel[],
        },
      };

      // WHEN
      const etapeMission = determineEtapeMission(viewModel);

      // THEN
      expect(etapeMission).toStrictEqual({ etat: 'INTRO', indexEtape: 0 });
    });

    it("et qu'au moins une KYC a été réalisée, retourne la dernière KYC réalisée", () => {
      // GIVEN
      const viewModel: MissionViewModel = {
        ...viewModelBase,
        kyc: {
          progression: {
            etapeCourante: 2,
            etapeTotal: 3,
          },
          kycs: [] as MissionBaseViewModel[],
        },
      };

      // WHEN
      const etapeMission = determineEtapeMission(viewModel);

      // THEN
      expect(etapeMission).toStrictEqual({ etat: 'KYC', indexEtape: 2 });
    });

    it('et que toutes les KYC ont été réalisées, retourne le premier quiz article', () => {
      // GIVEN
      const viewModel: MissionViewModel = {
        ...viewModelBase,
        kyc: {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
          kycs: [] as MissionBaseViewModel[],
        },
      };

      // WHEN
      const etapeMission = determineEtapeMission(viewModel);

      // THEN
      expect(etapeMission).toStrictEqual({ etat: 'QUIZ_ARTICLE', indexEtape: 0 });
    });

    it("et que tous les QuizArticles n'ont pas été réalisées, retourne le dernier quiz article non réalisé", () => {
      // GIVEN
      const viewModel: MissionViewModel = {
        ...viewModelBase,
        kyc: {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
          kycs: [] as MissionBaseViewModel[],
        },
        articleEtQuiz: [
          { aEteRealisee: true },
          { aEteRealisee: true },
          { aEteRealisee: true },
          { aEteRealisee: false },
        ] as MissionQuizArticleViewModel[],
      };

      // WHEN
      const etapeMission = determineEtapeMission(viewModel);

      // THEN
      expect(etapeMission).toStrictEqual({ etat: 'QUIZ_ARTICLE', indexEtape: 3 });
    });

    it("et que tous les QuizArticles ont été réalisées, retourne l'état défi", () => {
      // GIVEN
      const viewModel: MissionViewModel = {
        ...viewModelBase,
        kyc: {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
          kycs: [] as MissionBaseViewModel[],
        },
        articleEtQuiz: [
          { aEteRealisee: true },
          { aEteRealisee: true },
          { aEteRealisee: true },
          { aEteRealisee: true },
        ] as MissionQuizArticleViewModel[],
      };

      // WHEN
      const etapeMission = determineEtapeMission(viewModel);

      // THEN
      expect(etapeMission).toStrictEqual({ etat: 'DEFI', indexEtape: 0 });
    });
  });
});
