import { AxiosFactory } from '@/axios.factory';
import { CommuneRepository, Commune } from '@/domaines/communes/ports/commune.repository';

type CommunesApiModel = { code: string; label: string }[];

export class CommuneRepositoryAxios implements CommuneRepository {
  async getCommunes(codePostal: string): Promise<Commune[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CommunesApiModel>(`/communes_v2?code_postal=${codePostal}`);

    return response.data.map(commune => ({
      codeEpci: commune.code,
      label: commune.label,
    }));
  }
}
