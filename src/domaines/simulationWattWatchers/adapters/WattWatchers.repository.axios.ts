import { AxiosFactory } from '@/axios.factory';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/WattWatchers.repository';

interface RetourInscriptionParPrmApiModel {
  test: string;
}

export class WattWatchersRepositoryAxios implements WattWatchersRepository {
  async inscriptionParPrm(utilisateurId: string, prm: string, nom: string): Promise<void> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.post<RetourInscriptionParPrmApiModel>(
      `/utilisateurs/${utilisateurId}/winter/inscription_par_prm`,
      {
        prm,
        nom,
      },
    );
  }
}
