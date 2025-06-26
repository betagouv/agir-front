import { AxiosFactory, intercept40X } from '@/axios.factory';
import {
  ResultatSimulationMaif,
  RisqueMaifImpact,
  SimulateurMaifRepository,
} from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

type StatistiquesCommuneApiModel = {
  code_commune: string;
  nom_commune: string;
  nombre_catastrophes_naturels: number;
  pourcentage_commune_risque_inondation: number;
  pourcentage_commune_risque_secheresse_geotechnique: number;
};

type ResultatsSimulationMaifApiModel = {
  type_risque: string;
  titre: string;
  niveau_risque: RisqueMaifImpactApiModel;
}[];

export enum RisqueMaifImpactApiModel {
  TRES_FAIBLE = 'tres_faible',
  FAIBLE = 'faible',
  MOYEN = 'moyen',
  FORT = 'fort',
  TRES_FORT = 'tres_fort',
  INCONNU = 'inconnu',
}

export class SimulateurMaifRepositoryAxios implements SimulateurMaifRepository {
  @intercept40X()
  async recupererStatistiquesCommune(utilisateurId: string, codeEpci?: string): Promise<StatistiquesCommuneMaif> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.get<StatistiquesCommuneApiModel>(`/utilisateurs/${utilisateurId}/risques_commune`, {
      params: {
        code_commune: codeEpci ?? '',
      },
    });

    return {
      commune: response.data.nom_commune,
      nombreArretsCatnat: response.data.nombre_catastrophes_naturels,
      pourcentageSurfaceInondation: response.data.pourcentage_commune_risque_inondation,
      pourcentageSurfaceSecheresseGeotech: response.data.pourcentage_commune_risque_secheresse_geotechnique,
    };
  }

  @intercept40X()
  async recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.get<ResultatsSimulationMaifApiModel>(
      `/utilisateurs/${utilisateurId}/risques_adresse`,
      {
        params: {
          longitude: coordonnees.longitude,
          latitude: coordonnees.latitude,
        },
      },
    );

    return {
      risques: response.data.map(risque => ({
        nom: risque.titre,
        impact: this.mapRisqueMaifImpactApiModelToRisqueMaifImpact(risque.niveau_risque),
        id: risque.type_risque,
      })),
    };
  }

  private mapRisqueMaifImpactApiModelToRisqueMaifImpact(impact: RisqueMaifImpactApiModel): RisqueMaifImpact {
    switch (impact) {
      case RisqueMaifImpactApiModel.TRES_FAIBLE:
        return RisqueMaifImpact.TRES_FAIBLE;
      case RisqueMaifImpactApiModel.FAIBLE:
        return RisqueMaifImpact.FAIBLE;
      case RisqueMaifImpactApiModel.MOYEN:
        return RisqueMaifImpact.MOYEN;
      case RisqueMaifImpactApiModel.FORT:
        return RisqueMaifImpact.FORT;
      case RisqueMaifImpactApiModel.TRES_FORT:
        return RisqueMaifImpact.TRES_FORT;
      case RisqueMaifImpactApiModel.INCONNU:
        return RisqueMaifImpact.INCONNU;
    }
  }
}
