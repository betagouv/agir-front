import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { AxiosFactory } from '@/axios.factory';
import Cookies from 'js-cookie';

interface UtilisateurApiModel {
  prenom: string;
  nom: string;
  id: string;
  code_postal: string;
  commune: string;
  email: string;
  revenu_fiscal: number | null;
  nombre_de_parts_fiscales: number | null;
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

    this.setBearerInCookie(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      codePostal: response.data.utilisateur.code_postal || '',
      commune: response.data.utilisateur.commune || '',
      prenom: response.data.utilisateur.prenom || '',
      mail: response.data.utilisateur.email,
      revenuFiscal: response.data.utilisateur.revenu_fiscal,
      nombreDePartsFiscales: response.data.utilisateur.nombre_de_parts_fiscales
        ? response.data.utilisateur.nombre_de_parts_fiscales
        : null,
    };
  }

  private setBearerInCookie(token: string) {
    Cookies.set('bearer', token, {
      secure: true,
    });
  }

  async getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel>(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom,
      id: response.data.id,
      codePostal: response.data.code_postal,
      commune: response.data.commune,
      prenom: response.data.prenom,
      mail: response.data.email,
      revenuFiscal: response.data.revenu_fiscal,
      nombreDePartsFiscales: response.data.nombre_de_parts_fiscales,
    };
  }

  async validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/valider`, {
      email,
      code,
    });

    this.setBearerInCookie(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      mail: response.data.utilisateur.email || '',
      codePostal: response.data.utilisateur.code_postal || '',
      commune: response.data.utilisateur.commune || '',
      prenom: response.data.utilisateur.prenom || '',
      revenuFiscal: response.data.utilisateur.revenu_fiscal,
      nombreDePartsFiscales: response.data.utilisateur.nombre_de_parts_fiscales,
    };
  }

  async renvoyerCodeOTP(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/renvoyer_code`, {
      email,
    });
  }

  async commencerRedefinirMotDePasse(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/oubli_mot_de_passe`, {
      email,
    });
  }

  async terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/modifier_mot_de_passe`, {
      email,
      mot_de_passe: motDePasse,
      code,
    });
  }
}
