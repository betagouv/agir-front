import { AxiosFactory, intercept401 } from '@/axios.factory';
import {
  ResultatSimulationMaif,
  RisqueMaifImpact,
  SimulateurMaifRepository,
} from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import {
  AdresseDansLeCompte,
  StatistiquesCommuneEtAdresse,
  StatistiquesCommuneMaif,
} from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
import { StatistiquesEndroitMaif } from '@/domaines/simulationMaif/recupererStatistiquesEndroitMaif.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

type StatistiquesCommuneApiModel = {
  nombre_arrets_catnat: number;
  pourcentage_surface_secheresse_geotech: number;
  pourcentage_surface_inondation: number;

  code_postal: string;
  commune: string;
  commune_label: string;
  latitude: number;
  longitude: number;
  rue: string;
  numero_rue: string;
};

type RequetesMaifApiModel = {
  resultats: {
    id: string;
    titre: string;
    pourcentage: number;
  }[];
};

type ResultatSimulationMaifApiModel = {
  resultats: {
    id: string;
    titre: string;
    description: string;
    niveau_risque: RisqueMaifImpactApiModel;
  }[];
};

export enum RisqueMaifImpactApiModel {
  TRES_FAIBLE = 'tres_faible',
  FAIBLE = 'faible',
  MOYEN = 'moyen',
  FORT = 'fort',
  TRES_FORT = 'tres_fort',
}

export class SimulateurMaifRepositoryAxios implements SimulateurMaifRepository {
  @intercept401()
  async recupererStatistiquesCommuneEtAdresse(utilisateurId: string): Promise<StatistiquesCommuneEtAdresse> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.get<StatistiquesCommuneApiModel>(`/utilisateurs/${utilisateurId}/logement`);
    const statistiquesCommune: StatistiquesCommuneMaif = {
      commune: response.data.commune_label,
      nombreArretsCatnat: response.data.nombre_arrets_catnat,
      pourcentageSurfaceInondation: response.data.pourcentage_surface_inondation,
      pourcentageSurfaceSecheresseGeotech: response.data.pourcentage_surface_secheresse_geotech,
    };
    const adresse: AdresseDansLeCompte = {
      codePostal: response.data.code_postal,
      commune: response.data.commune,
      communeLabel: response.data.commune_label,
      rue: response.data.rue,
      numeroRue: response.data.numero_rue,
      coordonnees: {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      },
    };
    return { statistiquesCommune, adresseDansLeCompte: adresse };
  }

  @intercept401()
  async recupererStatistiquesEndroit(utilisateurId: string, codeEpci: string): Promise<StatistiquesEndroitMaif> {
    const axios = AxiosFactory.getAxios();

    const responseCatNat = await axios.post<RequetesMaifApiModel>(
      `/utilisateurs/${utilisateurId}/recherche_services/maif/search2`,
      {
        categorie: 'catnat',
        code_commune: codeEpci,
      },
    );
    const responseSecheresse = await axios.post<RequetesMaifApiModel>(
      `/utilisateurs/${utilisateurId}/recherche_services/maif/search2`,
      {
        categorie: 'zones_secheresse',
        code_commune: codeEpci,
      },
    );
    const responseInnondation = await axios.post<RequetesMaifApiModel>(
      `/utilisateurs/${utilisateurId}/recherche_services/maif/search2`,
      {
        categorie: 'zones_inondation',
        code_commune: codeEpci,
      },
    );

    await Promise.all([responseCatNat, responseSecheresse, responseInnondation]);

    const pourcentageSurfaceInondation =
      responseInnondation.data.resultats.find(resultat => resultat.id === 'zone_total')?.pourcentage ?? 0;

    const pourcentageSurfaceSecheresseGeotech =
      responseSecheresse.data.resultats.find(resultat => resultat.id === 'zone_total')?.pourcentage ?? 0;

    return {
      nombreArretsCatnat: responseCatNat.data.resultats.length,
      pourcentageSurfaceInondation,
      pourcentageSurfaceSecheresseGeotech,
    };
  }

  @intercept401()
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
        impact: this.mapRisqueMaifImpactApiModelToRisqueMaifImpact(risque.niveau_risque),
        id: risque.id,
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
    }
  }
}
