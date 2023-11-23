import {
  RecommandationPersonnalisee,
  RecommandationsPersonnaliseesUsecase,
} from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';
import {
  RecommandationPersonnaliseeViewModel,
  RecommandationsPersonnaliseesPresenterImpl,
} from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';

class MockRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    return Promise.resolve([
      {
        id: 'id',
        type: InteractionType.QUIZ,
        titre: 'Premier Quiz',
        sousTitre: 'sousTitre',
        categorie: '🚲 Transports',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        url: '',
        aEteFaite: false,
        idDuContenu: '',
        duree: '',
        estBloquee: false,
      },
      {
        id: 'id2',
        type: InteractionType.ARTICLE,
        titre: 'Article qui doit être en avant',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        url: '',
        aEteFaite: true,
        idDuContenu: '',
        duree: '',
        estBloquee: false,
      },
      {
        id: 'id3',
        type: InteractionType.QUIZ,
        titre: 'Un autre Quiz',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        url: '',
        aEteFaite: true,
        idDuContenu: '',
        duree: '',
        estBloquee: false,
      },
      {
        id: 'id4',
        type: InteractionType.ARTICLE,
        titre: 'un autre article',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        url: '',
        aEteFaite: true,
        idDuContenu: '',
        duree: '',
        estBloquee: false,
      },
    ]);
  }
}
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
          id: 'id2',
          description: 'sousTitre',
          image: 'illustrationURL',
          titre: 'Article qui doit être en avant',
          url: '/article/Article qui doit être en avant',
          contentId: '',
          type: InteractionType.ARTICLE,
          nombreDePointsAGagner: 'nombreDePointsAGagner',
          thematique: '🌍 Global',
        },
        recommandationsList: [
          {
            id: 'id',
            image: 'illustrationURL',
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            url: '/coach/quiz/',
            contentId: '',
            type: InteractionType.QUIZ,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            id: 'id3',
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'Un autre Quiz',
            contentId: '',
            url: '/coach/quiz/',
            type: InteractionType.QUIZ,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
          {
            id: 'id4',
            image: 'illustrationURL',
            thematique: '🌍 Global',
            titre: 'un autre article',
            url: '/article/un autre article',
            contentId: '',
            type: InteractionType.ARTICLE,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            description: 'sousTitre',
          },
        ],
      });
    }
  });
});
