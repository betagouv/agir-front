import { Response } from 'redaxios';
import { AxiosError, AxiosFactory, intercept40X } from '@/axios.factory';
import {
  CompteTemporaire,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
  SuppressionFranceConnect,
} from '@/domaines/compte/ports/compteUtilisateur.repository';

interface CompteUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  prenom: string;
  pseudo: string;
  fonctionnalites_debloquees: string[];
}

export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire> {
    try {
      const axiosInstance = AxiosFactory.getAxios();

      const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/send_magic_link`, {
        email: compteUtilisateurACreer.email,
        situation_ngc_id: compteUtilisateurACreer.situationId,
        source_inscription: 'web',
        referer: compteUtilisateurACreer.situationId ? 'ngc' : compteUtilisateurACreer.referer,
        referer_keyword: compteUtilisateurACreer.refererKeyword,
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

  @intercept40X()
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

  @intercept40X()
  async mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${idUtilisateur}/profile`, {
      mot_de_passe: nouveauMotDePasse,
    });
  }
}

export class RepositoryError {
  constructor(
    public code: string,
    public message: string,
  ) {}
}
