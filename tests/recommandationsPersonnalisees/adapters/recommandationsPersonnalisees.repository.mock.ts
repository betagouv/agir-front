import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import { InteractionType } from '@/shell/interactionType';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class MockRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnaliseesThematique(
    _idThematique: string,
    _idUtilisateur: string,
  ): Promise<RecommandationPersonnalisee[]> {
    throw new Error('Method not implemented.');
  }

  recommandationAEteCliquee(_idUtilisateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  chargerRecommandationsPersonnalisees(_idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    return Promise.resolve([
      {
        type: InteractionType.QUIZ,
        titre: 'Premier Quiz',
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
        joursRestants: null,
        points: 10,
      },
      {
        type: InteractionType.ARTICLE,
        titre: 'Article qui doit être en avant',
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '2',
        joursRestants: null,
        points: 10,
      },
      {
        type: InteractionType.AIDE,
        titre: 'Aide vélo',
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
        points: 10,
      },
      {
        type: InteractionType.DEFIS,
        titre: 'Un défi',
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: 7,
        points: 10,
      },
      {
        titre: 'Un KYC',
        type: InteractionType.KYC,
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
        points: 10,
      },
      {
        type: InteractionType.DEFIS,
        titre: 'Un autre défi',
        sousTitre: 'sousTitre',
        clefThematiqueAPI: ClefThematiqueAPI.transports,
        nombreDePointsAGagner: 'nombreDePointsAGagner',
        illustrationURL: 'illustrationURL',
        idDuContenu: '1',
        joursRestants: null,
        points: 10,
      },
    ]);
  }
}
