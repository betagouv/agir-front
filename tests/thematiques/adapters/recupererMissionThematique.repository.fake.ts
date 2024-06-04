import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { InteractionType } from '@/shell/interactionType';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export class ThematiqueRepositoryFake implements ThematiqueRepository {
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    return Promise.resolve<MissionThematique>({
      titre: 'Thematique 1',
      univers: 'alimentation',
      urlImage: 'https://via.placeholder.com/150',
      estTerminee: false,
      items: [
        {
          id: 'id1',
          contentId: '1',
          titre: 'Mission 1',
          progression: 0,
          estBloquee: false,
          points: 10,
          aEteRealisee: false,
          type: InteractionType.QUIZ,
          pointAEteRecolte: false,
        },
        {
          id: 'id2',
          contentId: '2',
          titre: 'Mission 2',
          progression: 0,
          estBloquee: false,
          points: 10,
          aEteRealisee: false,
          type: InteractionType.DEFIS,
          pointAEteRecolte: false,
        },
        {
          id: 'id3',
          contentId: '3',
          titre: 'Mission 3',
          progression: 0,
          estBloquee: false,
          points: 10,
          aEteRealisee: false,
          type: InteractionType.KYC,
          pointAEteRecolte: false,
        },
      ],
      idThematique: '1',
      progressionKyc: {
        etapeCourante: 1,
        etapeTotal: 2,
      },
    });
  }

  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    return [
      {
        titre: 'Thematique 1',
        id: '1',
        progression: { etapeActuelle: 0, etapeCible: 4 },
        estBloquee: false,
        raisonDuBlocage: '',
        estNouvelle: true,
        niveau: 0,
        urlImage: 'https://via.placeholder.com/150',
      },
      {
        titre: 'Thematique 2',
        id: '2',
        progression: { etapeActuelle: 0, etapeCible: 4 },
        estBloquee: true,
        raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
        estNouvelle: true,
        niveau: 0,
        urlImage: 'https://via.placeholder.com/150',
      },
    ];
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    return Promise.resolve();
  }
}
