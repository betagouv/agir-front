import { CommuneRepository } from '@/communes/ports/communeRepository';
import { AxiosFactory } from '@/axios.factory';

export class CommuneRepositoryAxios implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<string[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<string[]>(`/communes?code_postal=${codePostal}`);

    return response.data;
  }
}
