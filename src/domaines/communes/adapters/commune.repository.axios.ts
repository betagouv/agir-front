import { AxiosFactory } from '@/axios.factory';
import { CommuneRepository, Communes, CommunesEPCI } from '@/domaines/communes/ports/communeRepository';

type CommuneApiModel = string[];
export type CommunesApiEPCIModel = {
  code_insee: string;
  nom: string;
}[];

export class CommuneRepositoryAxios implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<Communes> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CommuneApiModel>(`/communes?code_postal=${codePostal}`);

    return response.data;
  }

  async getCommunesEPCI(nom: string): Promise<CommunesEPCI> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CommunesApiEPCIModel>(`/communes_epci?nom=${nom}`);

    return response.data.map(commune => ({
      codeInsee: commune.code_insee,
      nom: commune.nom,
    }));
  }
}
