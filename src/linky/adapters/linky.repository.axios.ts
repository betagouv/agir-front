import { AxiosFactory, intercept401 } from '@/axios.factory';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';
import { ConsommationElectrique, LinkyRepository } from '@/linky/ports/linkyRepository.repository';

interface ConsommationElectriqueApiModel {
  commentaires: [];
  data: {
    valeur: number;
    mois: string;
    annee: string;
    date: string;
  }[];
}

interface InformationCompteurApiModel {
  is_configured: boolean;
  is_activated: boolean;
  is_fully_running: boolean;
  configuration: {
    prm: string;
    error_code: string;
  };
}

export class LinkyRepositoryAxios implements LinkyRepository {
  @intercept401()
  async marqueLeServiceCommeConsulte(idUtilsateur: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilsateur}/events`, {
      type: 'access_conf_linky',
    });
  }
  @intercept401()
  async recupererConsommationElectriqueAnnuelle(idUtilsateur: string): Promise<ConsommationElectrique> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ConsommationElectriqueApiModel>(
      `/utilisateurs/${idUtilsateur}/linky?compare_annees=true`,
    );

    return {
      commentaires: reponse.data.commentaires,
      data: reponse.data.data.map(donneeConsommation => ({
        mois: donneeConsommation.mois,
        annee: donneeConsommation.annee,
        valeur: donneeConsommation.valeur,
        date: donneeConsommation.date,
      })),
    };
  }

  @intercept401()
  async recupererConsommationElectriqueQuatorzeJours(idUtilsateur: string): Promise<ConsommationElectrique> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ConsommationElectriqueApiModel>(
      `/utilisateurs/${idUtilsateur}/linky?derniers_14_jours=true`,
    );

    return {
      commentaires: reponse.data.commentaires,
      data: reponse.data.data.map(donneeConsommation => ({
        mois: donneeConsommation.mois,
        annee: donneeConsommation.annee,
        valeur: donneeConsommation.valeur,
        date: donneeConsommation.date,
      })),
    };
  }

  @intercept401()
  async recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<InformationCompteurApiModel>(
      `/utilisateurs/${idUtilsateur}/services/linky`,
    );

    return {
      prm: reponse.data.configuration.prm,
      estConfigure: reponse.data.is_configured,
      estActif: reponse.data.is_activated,
      estFonctionnel: reponse.data.is_fully_running,
      configurationEnErreur: reponse.data.configuration.error_code
        ? reponse.data.configuration.error_code !== '0'
        : false,
    };
  }
}
