import { Response } from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
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
      nom: response.data.nom,
      id: idUtilisateur,
      mail: response.data.email || '',
      prenom: response.data.prenom || '',
      fonctionnalitesDebloquees: response.data.fonctionnalites_debloquees,
    };
  }

  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/`, {
        nom: compteUtilisateurACreer.nom,
        prenom: compteUtilisateurACreer.prenom,
        email: compteUtilisateurACreer.email,
        mot_de_passe: compteUtilisateurACreer.motDePasse,
        annee_naissance: compteUtilisateurACreer.anneeDeNaissance,
        onboardingData: {
          transports: compteUtilisateurACreer.onboarding.etapeTransport.transports,
          avion: compteUtilisateurACreer.onboarding.etapeTransport.avion,
          code_postal: compteUtilisateurACreer.onboarding.etapeLogement.code_postal,
          commune: compteUtilisateurACreer.onboarding.etapeLogement.commune,
          adultes: compteUtilisateurACreer.onboarding.etapeLogement.adultes,
          enfants: compteUtilisateurACreer.onboarding.etapeLogement.enfants,
          residence: compteUtilisateurACreer.onboarding.etapeLogement.residence,
          proprietaire: compteUtilisateurACreer.onboarding.etapeLogement.proprietaire,
          superficie: compteUtilisateurACreer.onboarding.etapeLogement.superficie,
          chauffage: compteUtilisateurACreer.onboarding.etapeLogement.chauffage,
          repas: compteUtilisateurACreer.onboarding.etapeAlimentation.repas,
          consommation: compteUtilisateurACreer.onboarding.etapeConsommation.consommation,
        },
      });
      return {
        mail: response.data.email || '',
      };
    } catch (e) {
      const domainError = e as Response<RepositoryError>;
      if (domainError) {
        throw new RepositoryError(domainError.data.code, domainError.data.message);
      } else {
        throw e;
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
}
