import { Response } from 'redaxios';
import { AxiosError, AxiosFactory, intercept401 } from '@/axios.factory';
import {
  CompteTemporaire,
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
  SuppressionFranceConnect,
} from '@/domaines/compte/ports/compteUtilisateur.repository';
import { RepositoryError } from '@/shell/repositoryError';

interface CompteUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  prenom: string;
  pseudo: string;
  fonctionnalites_debloquees: string[];
}

export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  @intercept401()
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.get(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom || '',
      id: idUtilisateur,
      mail: response.data.email || '',
      prenom: response.data.prenom || '',
      fonctionnalitesDebloquees: response.data.fonctionnalites_debloquees,
      pseudo: response.data.pseudo || '',
    };
  }

  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/send_magic_link`, {
        email: compteUtilisateurACreer.email,
        situation_ngc_id: compteUtilisateurACreer.situationId,
        source_inscription: compteUtilisateurACreer.situationId ? 'web_ngc' : 'web',
      });
      return {
        mail: response.data.email || '',
      };
    } catch (e) {
      const erreur = e as AxiosError;
      if (erreur.status === 400) {
        throw new RepositoryError((erreur.data as RepositoryError).code, (erreur.data as RepositoryError).message);
      } else if (!erreur.data) {
        throw new RepositoryError(
          'NETWORK_ERROR',
          'Erreur de connexion. Vérifiez votre connexion ou les bloqueurs de contenu.',
        );
      } else {
        throw new RepositoryError('UNKNOWN_ERROR', 'Une erreur inattendue est survenue.');
      }
    }
  }

  @intercept401()
  async supprimerCompteUtilisateur(idUtilisateur: string): Promise<SuppressionFranceConnect> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.delete(`/utilisateurs/${idUtilisateur}`);
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

  @intercept401()
  async mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
      mot_de_passe: nouveauMotDePasse,
    });
  }

  @intercept401()
  async validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    pseudo: string,
    codeEpci: string,
    codePostal: string,
    dateNaissance?: { jour: number; mois: number; annee: number },
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
      pseudo: pseudo,
    });

    if (dateNaissance) {
      await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
        annee_naissance: dateNaissance.annee,
        mois_naissance: dateNaissance.mois,
        jour_naissance: dateNaissance.jour,
      });
    }

    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/logement`, {
      code_commune: codeEpci,
      code_postal: codePostal,
    });
  }
}
