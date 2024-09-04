import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky//recupererConsommationElectrique.usecase';
import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { ConsommationElectrique } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

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

export class ServiceRechercheLinkyRepositoryAxios implements ServiceRechercheLinkyRepository {
  @intercept401()
  async recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectriqueGlobal> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponseAnnuelle = await axiosInstance.get<ConsommationElectriqueApiModel>(
      `/utilisateurs/${idUtilsateur}/linky?compare_annees=true`,
    );
    const reponseQuatorzeJours = await axiosInstance.get<ConsommationElectriqueApiModel>(
      `/utilisateurs/${idUtilsateur}/linky?derniers_14_jours=true`,
    );

    return {
      consommationQuatorzeJours: {
        commentaires: reponseQuatorzeJours.data.commentaires,
        data: this.mapConsommationElectrique(reponseQuatorzeJours.data.data),
      },
      consommationAnnuelle: {
        commentaires: reponseAnnuelle.data.commentaires,
        data: this.mapConsommationElectrique(reponseAnnuelle.data.data),
      },
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

  private mapConsommationElectrique(data: ConsommationElectriqueApiModel['data']): ConsommationElectrique['data'] {
    return data.map(donneeConsommation => ({
      mois: donneeConsommation.mois,
      annee: donneeConsommation.annee,
      valeur: donneeConsommation.valeur,
      date: donneeConsommation.date,
    }));
  }
}
