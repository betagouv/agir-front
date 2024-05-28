import { ReponseInscription } from '../inscriptionListeDAttente.usecase';
import { ListeDAttenteRepository } from '../ports/listeDAttente.repository';
import { AxiosFactory } from '@/axios.factory';

export class ListeDAttenteRepositoryAxios implements ListeDAttenteRepository {
  async inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      await axiosInstance.post('/utilisateurs/file_attente', {
        email,
        codePostal,
        typeVisiteur,
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
