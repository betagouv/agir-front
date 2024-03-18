import { IdUtilisateur, Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { AxiosFactory } from '@/axios.factory';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface UtilisateurApiModel {
  prenom: string;
  nom: string;
  id: string;
  code_postal: string;
  commune: string;
  email: string;
  revenu_fiscal: number | null;
  nombre_de_parts_fiscales: number;
  abonnement_transport: boolean;
  fonctionnalites_debloquees: string[];
}

interface LoginApiModel {
  utilisateur: UtilisateurApiModel;
  token: string;
}

interface ValiderCompteApiModel {
  token: string;
}
export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async authentifierUtilisateur(mail: string, password: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/login`, {
      email: mail,
      mot_de_passe: password,
    });

    this.setBearerInCookie(response.data.token);
    AxiosFactory.getInstance().updateBearer(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      codePostal: response.data.utilisateur.code_postal || '',
      commune: response.data.utilisateur.commune || '',
      prenom: response.data.utilisateur.prenom || '',
      mail: response.data.utilisateur.email,
      abonnementTransport: response.data.utilisateur.abonnement_transport,

      revenuFiscal: response.data.utilisateur.revenu_fiscal,
      nombreDePartsFiscales: response.data.utilisateur.nombre_de_parts_fiscales,
      fonctionnalitesDebloquees: response.data.utilisateur.fonctionnalites_debloquees,
    };
  }

  private setBearerInCookie(token: string) {
    Cookies.set('bearer', token, {
      secure: true,
    });
  }

  async getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
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
      abonnementTransport: response.data.abonnement_transport,
      fonctionnalitesDebloquees: response.data.fonctionnalites_debloquees || ['aides'],
    };
  }

  async validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    const response = await axiosInstance.post<ValiderCompteApiModel>(`/utilisateurs/valider`, {
      email,
      code,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const utilisateurId = jwtDecode(response.data.token).utilisateurId as string;
    this.setBearerInCookie(response.data.token);
    AxiosFactory.getInstance().updateBearer(response.data.token);
    return utilisateurId;
  }

  async renvoyerCodeOTP(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    await axiosInstance.post(`/utilisateurs/renvoyer_code`, {
      email,
    });
  }

  async commencerRedefinirMotDePasse(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    await axiosInstance.post(`/utilisateurs/oubli_mot_de_passe`, {
      email,
    });
  }

  async terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    await axiosInstance.post(`/utilisateurs/modifier_mot_de_passe`, {
      email,
      mot_de_passe: motDePasse,
      code,
    });
  }
}
