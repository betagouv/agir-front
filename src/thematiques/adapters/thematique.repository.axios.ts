import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ThematiqueRepository } from '@/thematiques/ports/thematique.repository';
import { Thematique } from '@/thematiques/recupererThematiquesUniversUsecase';

export class ThematiqueRepositoryAxios implements ThematiqueRepository {
  @intercept401()
  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get(`/utilisateurs/${utilisateurId}/univers/${universId}/thematiques`);
    return response.data;
  }
}
