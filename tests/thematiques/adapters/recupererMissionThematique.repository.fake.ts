import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { InteractionType } from '@/shell/interactionType';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export class ThematiqueRepositoryFake implements ThematiqueRepository {
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    return Promise.resolve({
      titre: 'Thematique 1',
      urlImage: 'https://via.placeholder.com/150',
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
        },
        {
          id: 'id2',
          contentId: '2',
          titre: 'Mission 2',
          progression: 0,
          estBloquee: false,
          points: 10,
          aEteRealisee: false,
          type: InteractionType.QUIZ,
        },
      ],
    });
  }

  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    return [
      {
        titre: 'Thematique 1',
        id: '1',
        progression: 0,
        estBloquee: false,
        raisonDuBlocage: '',
        estNouvelle: true,
        niveau: 0,
        urlImage: 'https://via.placeholder.com/150',
      },
      {
        titre: 'Thematique 2',
        id: '2',
        progression: 0,
        estBloquee: true,
        raisonDuBlocage: 'Depensez 1000 points pour débloquer cette thématique',
        estNouvelle: true,
        niveau: 0,
        urlImage: 'https://via.placeholder.com/150',
      },
    ];
  }
}
