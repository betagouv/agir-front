import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AxiosFactory } from '@/axios.factory';
import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

interface UtilisateurApiModel {
  prenom: string;
  nom: string;
  id: string;
  email: string;
  abonnement_transport: boolean;
  fonctionnalites_debloquees: string[];
  is_onboarding_done: boolean;
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
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/login`, {
      email: mail,
      mot_de_passe: password,
    });

    this.setBearerInCookie(response.data.token);

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      prenom: response.data.utilisateur.prenom || '',
      mail: response.data.utilisateur.email,
      fonctionnalitesDebloquees: response.data.utilisateur.fonctionnalites_debloquees,
      onboardingAEteRealise: response.data.utilisateur.is_onboarding_done,
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
      prenom: response.data.prenom,
      mail: response.data.email,
      fonctionnalitesDebloquees: response.data.fonctionnalites_debloquees || ['aides'],
      onboardingAEteRealise: response.data.is_onboarding_done,
    };
  }

  async validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<ValiderCompteApiModel>(`/utilisateurs/valider`, {
      email,
      code,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const utilisateurId = jwtDecode(response.data.token).utilisateurId as string;
    this.setBearerInCookie(response.data.token);

    return utilisateurId;
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
