import { CommuneRepository, Communes } from '@/communes/ports/communeRepository';
import { AxiosFactory } from '@/axios.factory';

type CommuneApiModel = string[];
export class CommuneRepositoryAxios implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<Communes> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    const response = await axiosInstance.get<CommuneApiModel>(`/communes?code_postal=${codePostal}`);

    return response.data;
  }
}
