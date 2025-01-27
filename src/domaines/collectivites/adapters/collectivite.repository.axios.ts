import { AxiosFactory } from '@/axios.factory';
import { CollectiviteRepository, Collectivites } from '@/domaines/collectivites/ports/collectivite.repository';

export type CollectivitesAPIModel = {
  code_insee: string;
  nom: string;
}[];

export class CollectiviteRepositoryAxios implements CollectiviteRepository {
  async findCollectivites(nom: string, limite: number): Promise<Collectivites> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CollectivitesAPIModel>(`/communes_epci?nom=${nom}`);

    return new Collectivites(
      response.data.map(collectivite => ({
        codeInsee: collectivite.code_insee,
        nom: collectivite.nom,
      })),
      limite,
    );
  }
}
