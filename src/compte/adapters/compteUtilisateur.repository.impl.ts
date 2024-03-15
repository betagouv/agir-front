import {
  CompteTemporaire,
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Response } from 'redaxios';
import { RepositoryError } from '@/shell/repositoryError';
import { Cachable, cache, removeCache } from '@/shell/cache/cacheDecorator';
import { sessionAppRawDataStorage } from '@/shell/cache/appRawDataStorage';

interface CompteUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  code_postal: string;
  commune: string;
  prenom: string;
  revenu_fiscal: number | null;
  nombre_de_parts_fiscales: number;
  abonnement_ter_loire: boolean;
  fonctionnalites_debloquees: string[];
}
export class CompteUtilisateurRepositoryImpl extends Cachable implements CompteUtilisateurRepository {
  private static COMPTE_CACHE_KEY = 'compte';
  constructor() {
    super(sessionAppRawDataStorage);
  }
  @intercept401()
  @cache({ key: CompteUtilisateurRepositoryImpl.COMPTE_CACHE_KEY })
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.get(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom,
      id: idUtilisateur,
      mail: response.data.email || '',
      codePostal: response.data.code_postal || '',
      prenom: response.data.prenom || '',
      commune: response.data.commune || '',
      revenuFiscal: response.data.revenu_fiscal,
      nombreDePartsFiscales: response.data.nombre_de_parts_fiscales,
      abonnementTransport: response.data.abonnement_ter_loire,
      fonctionnalitesDebloquees: response.data.fonctionnalites_debloquees,
    };
  }

  @intercept401()
  @removeCache({ key: CompteUtilisateurRepositoryImpl.COMPTE_CACHE_KEY })
  async mettreAjour(compteUtilisateur: CompteUtilisateur) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${compteUtilisateur.id}/profile`, {
      nom: compteUtilisateur.nom,
      prenom: compteUtilisateur.prenom,
      email: compteUtilisateur.mail,
      code_postal: compteUtilisateur.codePostal,
      commune: compteUtilisateur.commune,
      revenu_fiscal: compteUtilisateur.revenuFiscal,
      nombre_de_parts_fiscales: compteUtilisateur.nombreDePartsFiscales,
      abonnement_ter_loire: compteUtilisateur.abonnementTransport,
    });
  }

  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/`, {
        nom: compteUtilisateurACreer.nom,
        prenom: compteUtilisateurACreer.prenom,
        email: compteUtilisateurACreer.email,
        mot_de_passe: compteUtilisateurACreer.motDePasse,
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
