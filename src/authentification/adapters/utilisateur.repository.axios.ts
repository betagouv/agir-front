import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { AxiosFactory } from '@/axios.factory';

interface UtilisateurApiModel {
  prenom: string;
  nom: string;
  id: string;
  code_postal: string;
  email: string;
  revenu_fiscal: string;
}
export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async getUtilisateurAvecLeNom(nomUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel[]>(`/utilisateurs?name=${nomUtilisateur}`);
    return {
      nom: response.data[0].nom,
      id: response.data[0].id,
      codePostal: response.data[0].code_postal || '',
      prenom: response.data[0].prenom || '',
      mail: response.data[0].email,
      revenuFiscal: response.data[0].revenu_fiscal || '',
    };
  }

  async getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel>(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom,
      id: response.data.id,
      codePostal: response.data.code_postal,
      prenom: response.data.prenom,
      mail: response.data.email,
      revenuFiscal: response.data.revenu_fiscal,
    };
  }
}
