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

interface LoginApiModel {
  utilisateur: UtilisateurApiModel;
  token: string;
}
export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async authentifierUtilisateur(mail: string, password: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/login`, {
      email: mail,
      mot_de_passe: password,
    });
    AxiosFactory.setBearer(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      codePostal: response.data.utilisateur.code_postal || '',
      prenom: response.data.utilisateur.prenom || '',
      mail: response.data.utilisateur.email,
      revenuFiscal: response.data.utilisateur.revenu_fiscal || '',
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
  async validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/valider`, {
      email,
      code,
    });

    AxiosFactory.setBearer(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      mail: response.data.utilisateur.email || '',
      codePostal: response.data.utilisateur.code_postal || '',
      prenom: response.data.utilisateur.prenom || '',
      revenuFiscal: response.data.utilisateur.revenu_fiscal || '',
    };
  }
}
