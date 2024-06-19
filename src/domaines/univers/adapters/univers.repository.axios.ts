import { AxiosFactory, intercept401 } from '@/axios.factory';
import { UniversRepository } from '@/domaines/univers/ports/univers.repository';
import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export interface UniversApiModel {
  titre: string;
  type: string;
  etoiles: number;
  is_locked: boolean;
  is_done: boolean;
  reason_locked: string;
  image_url: string;
}

export class UniversRepositoryAxios implements UniversRepository {
  @intercept401()
  async recupererLaListeDesUnivers(idUtilisateur: string): Promise<Univers[]> {
    const axios = AxiosFactory.getAxios();
    const universApiModel = await axios.get<UniversApiModel[]>(`/utilisateurs/${idUtilisateur}/univers`);
    return universApiModel.data.map(univers => ({
      id: univers.type,
      nom: univers.titre,
      urlImage: univers.image_url,
      nombreDeDefisRealises: univers.etoiles,
      estBloque: univers.is_locked,
      estTermine: univers.is_done,
    }));
  }

  @intercept401()
  async recupererUnivers(idUtilisateur: string, universId: string): Promise<Univers> {
    const axios = AxiosFactory.getAxios();
    const universApiModel = await axios.get<UniversApiModel[]>(`/utilisateurs/${idUtilisateur}/univers`);
    const universFiltrer = universApiModel.data
      .filter(univers => univers.type === universId)
      .map<Univers>(univers => ({
        id: univers.type,
        nom: univers.titre,
        urlImage: univers.image_url,
        nombreDeDefisRealises: univers.etoiles,
        estBloque: univers.is_locked,
        estTermine: univers.is_done,
      }));
    return universFiltrer[0];
  }
}
