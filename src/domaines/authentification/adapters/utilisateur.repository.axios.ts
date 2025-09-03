import { jwtDecode } from 'jwt-decode';
import { AxiosFactory } from '@/axios.factory';
import {
  DeconnexionFranceConnect,
  Utilisateur,
  UtilisateurConnecte,
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
  couverture_aides_ok: boolean;
  pseudo?: string;
  is_nom_prenom_modifiable: boolean;
  popup_reset_est_vue: boolean;
}

interface LoginApiModel {
  utilisateur: UtilisateurApiModel;
  token: string;
}

interface ValiderCompteApiModel {
  token: string;
}

export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async validerMagicLink(email: string, code: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/utilisateurs/magic_link_login`, {
      email,
      code,
    });

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      prenom: response.data.utilisateur.prenom,
      pseudo: response.data.utilisateur.pseudo || response.data.utilisateur.prenom,
      mail: response.data.utilisateur.email,
      onboardingAEteRealise: response.data.utilisateur.is_onboarding_done,
      afficherDisclaimerAides: !response.data.utilisateur.couverture_aides_ok,
      token: response.data.token,
      estUnUtilisateurFranceConnect: !response.data.utilisateur.is_nom_prenom_modifiable,
      afficherMessageReset: !response.data.utilisateur.popup_reset_est_vue,
    };
  }

  async getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel>(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom,
      id: response.data.id,
      prenom: response.data.prenom,
      mail: response.data.email,
      onboardingAEteRealise: response.data.is_onboarding_done,
      afficherDisclaimerAides: !response.data.couverture_aides_ok,
      pseudo: response.data.pseudo || '',
      estUnUtilisateurFranceConnect: !response.data.is_nom_prenom_modifiable,
      afficherMessageReset: !response.data.popup_reset_est_vue,
    };
  }

  async validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<ValiderCompteApiModel>(`/utilisateurs/valider`, {
      email,
      code,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const utilisateurId = jwtDecode(response.data.token).utilisateurId as string;

    return {
      id: utilisateurId,
      token: response.data.token,
    };
  }

  async renvoyerCodeOTP(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/renvoyer_code`, {
      email,
    });
  }

  async seConnecterAvecFranceConnect(code: string, loginId: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<LoginApiModel>(`/login_france_connect_step_2`, {
      oidc_code: code,
      oidc_state: loginId,
    });

    return {
      nom: response.data.utilisateur.nom,
      id: response.data.utilisateur.id,
      prenom: response.data.utilisateur.prenom,
      mail: response.data.utilisateur.email,
      pseudo: response.data.utilisateur.pseudo || response.data.utilisateur.prenom,
      onboardingAEteRealise: response.data.utilisateur.is_onboarding_done,
      afficherDisclaimerAides: !response.data.utilisateur.couverture_aides_ok,
      token: response.data.token,
      estUnUtilisateurFranceConnect: true,
      afficherMessageReset: !response.data.utilisateur.popup_reset_est_vue,
    };
  }

  async deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.post(`/utilisateurs/${idUtilisateur}/logout`, {});
    if (reponse.data.france_connect_logout_url) {
      return {
        doitSeDeconnecterDeFranceConnect: true,
        urlDeDeconnexion: reponse.data.france_connect_logout_url,
      };
    } else {
      return {
        doitSeDeconnecterDeFranceConnect: false,
        urlDeDeconnexion: '',
      };
    }
  }

  async terminerMessageReset(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${idUtilisateur}/gamification/popup_reset_vue`);
  }

  async envoyerUnMagicLink(email: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/send_magic_link`, {
      email,
    });
  }
}
