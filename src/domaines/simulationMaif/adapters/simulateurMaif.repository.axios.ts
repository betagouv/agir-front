import { AxiosFactory } from '@/axios.factory';
import {
  ResultatSimulationMaif,
  RisqueMaifImpact,
  SimulateurMaifRepository,
} from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaif.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

type StatistiquesCommuneApiModel = {
  nombre_arrets_catnat: number;
  pourcentage_surface_secheresse_geotech: number;
  pourcentage_surface_inondation: number;
  commune_label: string;
};

type ResultatSimulationMaifApiModel = {
  resultats: {
    id: string;
    titre: string;
    description: string;
    niveau_risque: string;
  }[];
};

export class SimulateurMaifRepositoryAxios implements SimulateurMaifRepository {
  async recupererStatistiquesCommune(utilisateurId: string): Promise<StatistiquesCommuneMaif> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.get<StatistiquesCommuneApiModel>(`/utilisateurs/${utilisateurId}/logement`);
    return {
      commune: response.data.commune_label,
      nombreArretsCatnat: response.data.nombre_arrets_catnat,
      pourcentageSurfaceInondation: response.data.pourcentage_surface_inondation,
      pourcentageSurfaceSecheresseGeotech: response.data.pourcentage_surface_secheresse_geotech,
    };
  }

  async recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.post<ResultatSimulationMaifApiModel>(
      `/utilisateurs/${utilisateurId}/recherche_services/maif/search2`,
      {
        categorie: 'score_risque',
        longitude: coordonnees.longitude,
        latitude: coordonnees.latitude,
      },
    );

    return {
      risques: response.data.resultats.map(risque => ({
        nom: risque.titre,
        impact: risque.niveau_risque as RisqueMaifImpact,
      })),
    };
  }
}
