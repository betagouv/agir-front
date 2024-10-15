import { Response } from 'redaxios';
import { AxiosError, AxiosFactory, intercept401 } from '@/axios.factory';
import {
  CompteTemporaire,
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/domaines/compte/ports/compteUtilisateur.repository';
import { RepositoryError } from '@/shell/repositoryError';

interface CompteUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  prenom: string;
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
    };
  }

  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs_v2/`, {
        email: compteUtilisateurACreer.email,
        mot_de_passe: compteUtilisateurACreer.motDePasse,
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
  async supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${idUtilisateur}`);
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
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
      prenom,
    });

    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/logement`, {
      commune,
      code_postal: codePostal,
    });
  }
}
