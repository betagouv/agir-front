import { AxiosFactory } from '@/axios.factory';
import { NouveauParcoursRepository } from '@/domaines/nouveauParcours/ports/nouveauParcours.repository';
import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

interface NouveauParcoursModeAPI {
  nombre_inscrits: number;
  nombre_points_moyen: number;
  nombre_aides_total: number;
  nombre_aides_nat_total: number;
  nombre_aides_region_total: number;
  nombre_aides_departement_total: number;
  nombre_aides_commune_total: number;
  result_LVO_all: number;
  result_LVO_donner: number;
  result_LVO_reparer: number;
  result_LVO_louer: number;
  result_LVO_emprunter: number;
  result_PDCN_circuit_court: number;
  result_PDCN_epicerie_superette: number;
  result_PDCN_marche_local: number;
  result_PDCN_zero_dechet: number;
}

class NouveauParcoursRepositoryAxios implements NouveauParcoursRepository {
  async getNouveauParcours(codePostal: string): Promise<NouveauParcours> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<NouveauParcoursModeAPI>(`/code_postal_synthese/${codePostal}`);
    return {
      nombreInscrits: response.data.nombre_inscrits,
      nombrePointsMoyen: response.data.nombre_points_moyen,
      aides: {
        nombreAidesTotal: response.data.nombre_aides_total,
        nombreAidesNatTotal: response.data.nombre_aides_nat_total,
        nombreAidesRegionTotal: response.data.nombre_aides_region_total,
        nombreAidesDepartementTotal: response.data.nombre_aides_departement_total,
        nombreAidesCommuneTotal: response.data.nombre_aides_commune_total,
      },
      longueVieAuxObjets: {
        tout: response.data.result_LVO_all,
        donner: response.data.result_LVO_donner,
        reparer: response.data.result_LVO_reparer,
        louer: response.data.result_LVO_louer,
        emprunter: response.data.result_LVO_emprunter,
      },
      presDeChezNous: {
        circuitCourt: response.data.result_PDCN_circuit_court,
        epicerieSuperette: response.data.result_PDCN_epicerie_superette,
        marcheLocal: response.data.result_PDCN_marche_local,
        zeroDechet: response.data.result_PDCN_zero_dechet,
      },
    };
  }
}
