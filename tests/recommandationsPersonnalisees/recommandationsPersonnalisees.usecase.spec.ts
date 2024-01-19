import { RecommandationsPersonnaliseesUsecase } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';
import {
  RecommandationPersonnaliseeViewModel,
  RecommandationsPersonnaliseesPresenterImpl,
} from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
import { MockRecommandationsPersonnaliseesRepository } from './adapters/recommandationsPersonnalisees.repository.mock';

describe('Fichier de tests concernant le chargement des recommandations personnalisees', () => {
  it('En donnant un id utilisateur doit charger 1 article mis en avant et 3 recommandations personnalisees secondaires', async () => {
    // GIVEN
    const usecase = new RecommandationsPersonnaliseesUsecase(new MockRecommandationsPersonnaliseesRepository());

    // WHEN
    await usecase.execute('1', new RecommandationsPersonnaliseesPresenterImpl(expectation));

    // THEN
    function expectation(recommandationsPersonnaliseesViewModel: RecommandationPersonnaliseeViewModel) {
      expect(recommandationsPersonnaliseesViewModel).toStrictEqual<RecommandationPersonnaliseeViewModel>({
        recommandationHighlight: {
          description: 'sousTitre',
          image: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          url: '/article/Article qui doit être en avant',
          contentId: '2',
          type: InteractionType.ARTICLE,
          nombreDePointsAGagner: 'nombreDePointsAGagner',
          thematique: '🌍 Global',
        },
        recommandationsList: [
          {
            image: 'illustrationURL',
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            url: '/agir/quiz/2',
            contentId: '2',
            type: InteractionType.QUIZ,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'Un autre Quiz',
            contentId: '1',
            url: '/agir/quiz/1',
            type: InteractionType.QUIZ,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'un autre article',
            url: '/article/un autre article',
            contentId: '1',
            type: InteractionType.ARTICLE,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
        ],
      });
    }
  });
});
