import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { WattWatchersRepository } from '@/domaines/simulationWattWatchers/ports/wattWatchers.repository';
import { ResultatWattWatchers } from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';

interface RetourInscriptionParPrmApiModel {
  test: string;
}

interface WattWatchersApiModel {
  consommation_totale_euros: number;
  economies_possibles_euros: number;
  economies_realisees_euros: number;
  nombre_actions_associees: number;
  detail_usages: [
    {
      type: string;
      eur: number;
      percent: number;
      couleur: string;
      emoji: string;
    },
  ];
}

export class WattWatchersRepositoryAxios implements WattWatchersRepository {
  @intercept401()
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

  @intercept401()
  async recupererConsommation(utilisateurId: string): Promise<ResultatWattWatchers> {
    const axios = AxiosFactory.getAxios();
    const data = await axios.get<WattWatchersApiModel>(`/utilisateurs/${utilisateurId}/winter/consommation`);

    return {
      consommationTotaleEnEuros: data.data.consommation_totale_euros,
      economiesPossiblesEnEuros: data.data.economies_possibles_euros,
      economiesRealiseesEnEuros: data.data.economies_realisees_euros,
      nombreActionsAssociees: data.data.nombre_actions_associees,
      detailsUsages: data.data.detail_usages.map(usage => ({
        type: usage.type,
        eur: usage.eur,
        percent: usage.percent,
        couleur: usage.couleur,
        emoji: usage.emoji,
      })),
    };
  }
}
