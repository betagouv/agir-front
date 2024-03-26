import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';

export class MockRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  recommandationAEteCliquee(_idUtilisateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  chargerRecommandationsPersonnalisees(_idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    return Promise.resolve([
      {
        type: InteractionType.QUIZ,
        titre: 'Premier Quiz',
        sousTitre: 'sousTitre',
        categorie: '🚲 Transports',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
        joursRestants: null,
      },
      {
        type: InteractionType.ARTICLE,
        titre: 'Article qui doit être en avant',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
        joursRestants: null,
      },
      {
        type: InteractionType.AIDE,
        titre: 'Aide vélo',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
      },
      {
        type: InteractionType.DEFIS,
        titre: 'Un défi',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: 7,
      },
      {
        titre: 'Un KYC',
        type: InteractionType.KYC,
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
      },
      {
        type: InteractionType.DEFIS,
        titre: 'Un autre défi',
        sousTitre: 'sousTitre',
        categorie: '🌍 Global',
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
      },
    ]);
  }
}
