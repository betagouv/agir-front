import { AxiosFactory, intercept401 } from '@/axios.factory';
import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

interface ConsommationElectriqueApiModel {
  commentaires: string;
  data: {
    valeur: number;
    mois: string;
    annee: string;
  }[];
}

interface InformationCompteurApiModel {
  is_configured: boolean;
  is_activated: boolean;
  is_fully_running: boolean;
  configuration: {
    prm: string;
  };
}

export class LinkyRepositoryAxios implements LinkyRepository {
  @intercept401()
  async recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectrique[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ConsommationElectriqueApiModel>(
      `/utilisateurs/${idUtilsateur}/linky?compare_annees=true`
    );

    return reponse.data.data.map(donneeConsommation => ({
      mois: donneeConsommation.mois,
      annee: donneeConsommation.annee,
      valeur: donneeConsommation.valeur,
    }));
  }

  @intercept401()
  async recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<InformationCompteurApiModel>(
      `/utilisateurs/${idUtilsateur}/services/linky`
    );

    return {
      prm: reponse.data.configuration.prm,
      estConfigure: reponse.data.is_configured,
      estActif: reponse.data.is_activated,
      estFonctionnel: reponse.data.is_fully_running,
    };
  }
}
