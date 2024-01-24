import { AxiosFactory, intercept401 } from '@/axios.factory';
import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';

interface ConsommationElectriqueApiModel {
  date: Date;
  valeur: number;
  valeur_corrigee: number;
}

export class LinkyRepositoryAxios implements LinkyRepository {
  @intercept401()
  async recupererConsommationElectrique(
    idUtilsateur: string,
    frequence: 'jour' | 'semaine' | 'mois' | 'annee',
    nombreOccurence: number
  ): Promise<ConsommationElectrique[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<ConsommationElectriqueApiModel[]>(
      `/utilisateurs/${idUtilsateur}/linky?detail=${frequence}&nombre=${nombreOccurence}`
    );

    return reponse.data.map(donneeConsommation => ({
      date: donneeConsommation.date,
      valeur_kWh: donneeConsommation.valeur,
      valeur_kWh_ajustée_temperature: donneeConsommation.valeur_corrigee,
    }));
  }
}
