import { AxiosFactory } from '@/axios.factory';
import { CommuneRepository, Communes } from '@/communes/ports/communeRepository';

type CommuneApiModel = string[];
export class CommuneRepositoryAxios implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<Communes> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CommuneApiModel>(`/communes?code_postal=${codePostal}`);

    return response.data;
  }
}
