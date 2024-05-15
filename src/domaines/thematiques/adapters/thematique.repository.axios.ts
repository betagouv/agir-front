import { MissionThematique } from '../recupererMissionThematiqueUsecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

interface ThematiqueApiModel {
  titre: string;
  type: string;
  progression: number;
  cible_progression: number;
  is_locked: boolean;
  reason_locked: string;
  is_new: boolean;
  niveau: number;
  image_url: string;
}

export class ThematiqueRepositoryAxios implements ThematiqueRepository {
  @intercept401()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    throw new Error('Method not implemented.');
  }
  @intercept401()
  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ThematiqueApiModel[]>(
      `/utilisateurs/${utilisateurId}/univers/${universId}/thematiques`,
    );
    return response.data.map(thematique => ({
      id: thematique.titre,
      titre: thematique.titre,
      progression: thematique.progression,
      estBloquee: thematique.is_locked,
      raisonDuBlocage: thematique.reason_locked,
      estNouvelle: thematique.is_new,
      niveau: thematique.niveau,
      urlImage: thematique.image_url,
    }));
  }
}
