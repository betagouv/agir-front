import { AxiosFactory, intercept401 } from '@/axios.factory';
import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

interface ConsommationElectriqueApiModel {
  valeur: number;
  mois: string;
  annee: string;
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
  async recupererConsommationElectrique(
    idUtilsateur: string,
    comparaisonParAnnee: boolean = true
  ): Promise<ConsommationElectrique[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const parametre = comparaisonParAnnee ? 'compare_annees=true' : 'compare_mois_sem_jour=true';
    const reponse = await axiosInstance.get<ConsommationElectriqueApiModel[]>(
      `/utilisateurs/${idUtilsateur}/linky?${parametre}`
    );

    return reponse.data.map(donneeConsommation => ({
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
