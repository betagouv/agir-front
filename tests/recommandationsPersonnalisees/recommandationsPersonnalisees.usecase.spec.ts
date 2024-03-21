import { RecommandationsPersonnaliseesUsecase } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import {
  RecommandationPersonnaliseeViewModel,
  RecommandationsPersonnaliseesPresenterImpl,
} from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
import { MockRecommandationsPersonnaliseesRepository } from './adapters/recommandationsPersonnalisees.repository.mock';

describe('Fichier de tests concernant le chargement des recommandations personnalisees', () => {
  it('En donnant un id utilisateur doit charger et mettre en forme les recommandations personnalisées suivant leur type', async () => {
    // GIVEN
    const usecase = new RecommandationsPersonnaliseesUsecase(new MockRecommandationsPersonnaliseesRepository());

    // WHEN
    await usecase.execute('1', new RecommandationsPersonnaliseesPresenterImpl(expectation));

    // THEN
    function expectation(recommandationsPersonnaliseesViewModel: RecommandationPersonnaliseeViewModel) {
      expect(recommandationsPersonnaliseesViewModel).toStrictEqual<RecommandationPersonnaliseeViewModel>({
        recommandationsList: [
          {
            image: 'illustrationURL',
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            bouton: {
              libelle: 'Répondre au quiz',
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-question-line',
              url: '/agir/quiz/2',
            },
            contentId: '2',
            type: {
              libelle: 'Quiz',
              style: 'background--vert--bourgeon',
            },
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            bouton: {
              libelle: "Lire l'article",
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-newspaper-line',
              url: '/article/article-qui-doit-etre-en-avant/2',
            },
            contentId: '2',
            description: 'sousTitre',
            image: 'illustrationURL',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Article qui doit être en avant',
            type: {
              libelle: 'Article',
              style: 'background--caramel',
            },
          },
          {
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'Aide vélo',
            contentId: '1',
            bouton: {
              libelle: "Simuler l'aide",
              style: 'fr-btn--secondary',
              url: '/vos-aides/',
            },
            type: {
              libelle: 'Aide',
              style: 'background--yellow',
            },
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'Un défi',
            type: {
              libelle: 'Action',
              style: 'background-bleu text--white',
            },
            bouton: {
              libelle: 'Relever le défi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            contentId: '1',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
        ],
      });
    }
  });
});
