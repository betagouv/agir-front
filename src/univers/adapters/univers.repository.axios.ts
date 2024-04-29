import { AxiosFactory, intercept401 } from '@/axios.factory';
import { UniversRepository } from '@/univers/ports/univers.repository';
import { Univers } from '@/univers/recupererListeUnivers.usecase';

interface UniversApiModel {
  titre: string;
  type: string;
  etoiles: 0;
  is_locked: boolean;
  reason_locked: string;
}

export class UniversRepositoryAxios implements UniversRepository {
  @intercept401()
  async recupererLaListeDesUnivers(idUtilisateur: string): Promise<Univers[]> {
    const axios = AxiosFactory.getAxios();
    const universApiModel = await axios.get<UniversApiModel[]>(`/utilisateurs/${idUtilisateur}/univers`);
    return universApiModel.data.map(univers => ({
      id: univers.type,
      nom: univers.titre,
      urlImage: 'https://via.placeholder.com/150',
      nombreDeDefisRealises: univers.etoiles,
    }));
  }
}
