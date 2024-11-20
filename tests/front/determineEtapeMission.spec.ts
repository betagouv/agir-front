// ToDo: tout refaire

import { expect } from 'vitest';
import { determineEtapeMission } from '@/shell/determineEtapeMission';
import { MissionViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

describe('Determine les étapes', () => {
  it('Golden master', () => {
    const tag = {
      label: 'string',
      style: {
        backgroundColor: 'dsdd',
        color: 'ds',
        emoji: ':)',
      },
    };
    const viewModel: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: true,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 0,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [],
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const viewModel2: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: false,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 0,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [],
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const viewModel3: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: false,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 1,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [],
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const viewModel4: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: false,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [],
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const viewModel5: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: false,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
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
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const viewModel6: MissionViewModel = {
      titre: 'ttitre',
      urlImage: 'string',
      estTerminee: false,
      estTerminable: true,
      intro: 'string',
      kyc: [
        {
          progression: {
            etapeCourante: 3,
            etapeTotal: 3,
          },
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
      articleEtQuiz: [
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
        {
          idDuContenu: '',
          type: 'quiz',
          id: '',
          url: '',
          estBloquee: false,
          aEteRealisee: true,
          picto: '',
          titre: '',
          pointAEteRecolte: false,
          points: 0,
        },
      ],
      defis: [],
      tag,
      nombreEtapesMission: 2,
    };

    const toto = determineEtapeMission(viewModel);
    const toto2 = determineEtapeMission(viewModel2);
    const toto3 = determineEtapeMission(viewModel3);
    const toto4 = determineEtapeMission(viewModel4);
    const toto5 = determineEtapeMission(viewModel5);
    const toto6 = determineEtapeMission(viewModel6);
    expect(toto).toStrictEqual({ etat: 'INTRO', indexEtape: 0 });
    expect(toto2).toStrictEqual({ etat: 'INTRO', indexEtape: 0 });
    expect(toto3).toStrictEqual({ etat: 'KYC', indexEtape: 1 });
    expect(toto4).toStrictEqual({ etat: 'QUIZ_ARTICLE', indexEtape: 0 });
    expect(toto5).toStrictEqual({ etat: 'QUIZ_ARTICLE', indexEtape: 3 });
    expect(toto6).toStrictEqual({ etat: 'DEFI', indexEtape: 0 });
  });
});
