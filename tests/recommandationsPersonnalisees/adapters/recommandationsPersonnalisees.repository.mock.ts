import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';

export class MockRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  recommandationAEteCliquee(idUtilisateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    return Promise.resolve([
      {
        type: InteractionType.QUIZ,
        titre: 'Premier Quiz',
        sousTitre: 'sousTitre',
        categorie: '🚲 Transports',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
      },
      {
        type: InteractionType.ARTICLE,
        titre: 'Article qui doit être en avant',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
      },
      {
        type: InteractionType.QUIZ,
        titre: 'Un autre Quiz',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
      },
      {
        type: InteractionType.ARTICLE,
        titre: 'un autre article',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
      },
    ]);
  }
}
