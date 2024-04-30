import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';
import { Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';
interface ThematiqueApiModel {
  titre: string;
  type: string;
  progression: number;
  cible_progression: number;
  is_locked: boolean;
  reason_locked: string;
  is_new: boolean;
  niveau: number;
}
export class ThematiqueRepositoryAxios implements ThematiqueRepository {
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
    }));
  }
}
