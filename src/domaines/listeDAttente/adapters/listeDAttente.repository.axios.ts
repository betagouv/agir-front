import { ReponseInscription } from '../inscriptionListeDAttente.usecase';
import { ListeDAttenteRepository } from '../ports/listeDAttente.repository';
import { ReponseVerification } from '../verificationWhiteListe.usecase';
import { AxiosFactory } from '@/axios.factory';

interface CheckWhitelisteApiModel {
  is_whitelisted: boolean;
  is_registered: boolean;
}
export class ListeDAttenteRepositoryAxios implements ListeDAttenteRepository {
  async verificationEmailWhiteListe(email: string): Promise<ReponseVerification> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponseVerification = await axiosInstance.post<CheckWhitelisteApiModel>('/utilisateurs/check_whiteliste', {
      email,
    });

    return {
      estAutorise: reponseVerification.data.is_whitelisted,
      aDejaUnCompte: reponseVerification.data.is_registered,
    };
  }

  async inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      await axiosInstance.post('/utilisateurs/file_attente', {
        email,
        code_postal: codePostal,
        code_profil: typeVisiteur,
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
