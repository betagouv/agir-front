import { MissionThematique } from '../recupererMissionThematiqueUsecase';
import { InteractionType } from '@/shell/interactionType';
import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';
import { Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';

export class ThematiqueRepositoryInMemory implements ThematiqueRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    return Promise.resolve<MissionThematique>({
      urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1714635495/univers_logement_6376123d16.jpg',
      titre: 'A la maison',
      items: [
        {
          contentId: '1',
          titre: '2 questions pour mieux vous connaître',
          progression: 0,
          estBloquee: false,
          points: 0,
          aEteRealisee: true,
          type: InteractionType.KYC,
        },
        {
          contentId: '2',
          titre: 'Les marchés gourmands à Dijon',
          progression: 0,
          estBloquee: false,
          points: 0,
          aEteRealisee: false,
          type: InteractionType.QUIZ,
        },
        {
          contentId: '3',
          titre: "Le café ca pollue mais c'est bon pour la santé",
          progression: 0,
          estBloquee: false,
          points: 0,
          aEteRealisee: false,
          type: InteractionType.ARTICLE,
        },
        {
          contentId: '5',
          titre: 'A découvrir',
          progression: 0,
          estBloquee: false,
          points: 0,
          aEteRealisee: false,
          type: InteractionType.DEFIS,
        },
        {
          contentId: '6',
          titre: 'A découvrir',
          progression: 0,
          estBloquee: false,
          points: 0,
          aEteRealisee: false,
          type: InteractionType.DEFIS,
        },
      ],
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
