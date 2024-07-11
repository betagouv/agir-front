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
        defis: [
          {
            bouton: {
              libelle: 'Faire le suivi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            idDuContenu: '1',
            image: '/reco_defi.jpg',
            joursRestants: 'Plus que 7 jours',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un défi',
            points: 10,
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
            image: '/reco_defi.jpg',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un autre défi',
            points: 10,
            type: {
              libelle: 'Action',
              style: 'background--bleu-ecume-hover',
            },
          },
        ],
        autresRecommandations: [
          {
            bouton: {
              libelle: 'Répondre au quiz',
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-question-line',
              url: '/quiz/2',
            },
            idDuContenu: '2',
            image: 'illustrationURL',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            points: 10,
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
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Article qui doit être en avant',
            points: 10,
            type: {
              libelle: 'Article',
              style: 'background--caramel',
            },
          },
          {
            bouton: {
              libelle: "Simuler l'aide",
              style: 'fr-btn--secondary',
              url: '/vos-aides/',
            },
            idDuContenu: '1',
            image: 'illustrationURL',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Aide vélo',
            points: 10,
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
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un KYC',
            points: 10,
            type: {
              libelle: 'Mieux vous connaître',
              style: 'background--pink',
            },
          },
        ],
      });
    }
  });
});
