import { RecupererRecommandationsPersonnaliseesUsecase } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import {
  RecommandationPersonnaliseeViewModel,
  RecommandationsPersonnaliseesPresenterImpl,
} from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
import { MockRecommandationsPersonnaliseesRepository } from './adapters/recommandationsPersonnalisees.repository.mock';

describe('Fichier de tests concernant le chargement des recommandations personnalisees', () => {
  it('En donnant un id utilisateur doit charger et mettre en forme les recommandations personnalisées suivant leur type', async () => {
    // GIVEN
    const usecase = new RecupererRecommandationsPersonnaliseesUsecase(
      new MockRecommandationsPersonnaliseesRepository(),
    );

    // WHEN
    await usecase.execute('1', new RecommandationsPersonnaliseesPresenterImpl(expectation));

    // THEN
    function expectation(recommandationsPersonnaliseesViewModel: RecommandationPersonnaliseeViewModel) {
      expect(recommandationsPersonnaliseesViewModel).toStrictEqual<RecommandationPersonnaliseeViewModel>({
        autresRecommandations: [
          {
            bouton: {
              libelle: 'Répondre au quiz',
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-question-line',
              url: '/quiz/2',
            },
            idDuContenu: '2',
            image: 'illustrationURL',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Premier Quiz',
            type: {
              libelle: 'Quiz',
              style: 'background--vert-bourgeon',
            },
          },
          {
            bouton: {
              libelle: "Lire l'article",
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-newspaper-line',
              url: '/article/article-qui-doit-etre-en-avant/2',
            },
            idDuContenu: '2',
            image: 'illustrationURL',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Article qui doit être en avant',
            type: {
              libelle: 'Article',
              style: 'background--caramel',
            },
          },
          {
            bouton: {
              libelle: "Simuler l'aide",
              style: 'fr-btn--secondary',
              url: '/aides',
            },
            idDuContenu: '1',
            image: 'illustrationURL',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Aide vélo',
            type: {
              libelle: 'Aide',
              style: 'background--yellow',
            },
          },
          {
            bouton: {
              libelle: 'Répondre à la question',
              style: 'fr-btn--icon-left fr-icon-arrow-right-line',
              url: '/mieux-vous-connaitre/1',
            },
            idDuContenu: '1',
            image: '/ic_kyc.svg',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Un KYC',
            type: {
              libelle: 'Mieux vous connaître',
              style: 'background--pink',
            },
          },
        ],
        defis: [
          {
            bouton: {
              libelle: 'Faire le suivi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            idDuContenu: '1',
            image: '/reco_defi.webp',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Un défi',
            type: {
              libelle: 'Action',
              style: 'background--bleu-ecume-hover',
            },
          },
          {
            bouton: {
              libelle: 'Relever le défi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            idDuContenu: '1',
            image: '/reco_defi.webp',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            points: 10,
            thematiqueTag: {
              label: 'Me déplacer',
              style: {
                backgroundColor: '#D2E9FF',
                color: '#021952',
                emoji: '🚗',
              },
            },
            titre: 'Un autre défi',
            type: {
              libelle: 'Action',
              style: 'background--bleu-ecume-hover',
            },
          },
        ],
      });
    }
  });
});
