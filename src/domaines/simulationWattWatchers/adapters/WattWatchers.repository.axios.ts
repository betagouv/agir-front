import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/WattWatchers.repository';

interface RetourInscriptionParPrmApiModel {
  test: string;
}

export class WattWatchersRepositoryAxios implements WattWatchersRepository {
  async inscriptionParPrm(utilisateurId: string, prm: string, nom: string): Promise<void> {
    const axios = AxiosFactory.getAxios();

    await axios.post<RetourInscriptionParPrmApiModel>(`/utilisateurs/${utilisateurId}/winter/inscription_par_prm`, {
      prm,
      nom,
    });
  }

  @intercept401()
  async inscriptionParAdresse(utilisateurId: string, nom: string, adresse: Adresse): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(
      `/utilisateurs/${utilisateurId}/winter/inscription_par_adresse`,

      {
        nom: nom,
        adresse: `${adresse.numeroRue} ${adresse.rue}`,
        code_postal: adresse.codePostal,
        code_commune: adresse.commune_label,
      },
    );
  }
}
