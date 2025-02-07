import { AxiosFactory } from '@/axios.factory';
import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { DonneesCollectivitesCP } from '@/domaines/collectivites/recupererDonneesCollectivitesCodePostal.usecase';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface AideOuArticleCollectiviteModelAPI {
  id: number;
  thematiques: ClefThematiqueAPI[];
  titre: string;
}

interface DonneesCollectivitesCPModelAPI {
  liste_communes: string[];
  nombre_inscrits: number;
  nombre_points_moyen: number;

  nombre_aides_total: number;
  nombre_aides_nat_total: number;
  nombre_aides_region_total: number;
  nombre_aides_departement_total: number;
  nombre_aides_commune_total: number;

  count_aide_alimentation: number;
  count_aide_consommation: number;
  count_aide_logement: number;
  count_aide_transport: number;
  count_aide_dechet: number;
  count_aide_loisir: number;

  result_LVO_all: number;
  result_LVO_donner: number;
  result_LVO_reparer: number;
  result_LVO_louer: number;
  result_LVO_emprunter: number;
  result_PDCN_circuit_court: number;
  result_PDCN_epicerie_superette: number;
  result_PDCN_marche_local: number;
  result_PDCN_zero_dechet: number;

  nombre_articles_locaux: number;
  nombre_articles_total: number;
  nombre_defis_encours: number;
  nombre_defis_realises: number;

  liste_id_articles_locaux: {
    id: number;
    thematique: ClefThematiqueAPI;
    titre: string;
  }[];
  liste_id_aides_locales: AideOuArticleCollectiviteModelAPI[];
}

interface DonneesCollectivitesINSEEModelAPI {
  liste_aides_region: AideOuArticleCollectiviteModelAPI[];
  liste_aides_departement: AideOuArticleCollectiviteModelAPI[];
  liste_aides_locales: AideOuArticleCollectiviteModelAPI[];
  liste_aides_nationales: AideOuArticleCollectiviteModelAPI[];

  liste_articles_region: AideOuArticleCollectiviteModelAPI[];
  liste_articles_departement: AideOuArticleCollectiviteModelAPI[];
  liste_articles_locales: AideOuArticleCollectiviteModelAPI[];

  nom_region: string;
  nom_departement: string;
  nom_commune_ou_collectivite: string;
  liste_communes_dans_EPCI: string[];
  est_EPCI: boolean;

  nombre_inscrits_total: number;
  nombre_inscrits_local: number;
  nombre_points_moyen: number;
  nombre_defis_encours: number;
  nombre_defis_realises: number;
}

export class DonneesCollectivitesRepositoryAxios implements DonneesCollectivitesRepository {
  async recupererDonneesCodePostal(codePostal: string): Promise<DonneesCollectivitesCP> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<DonneesCollectivitesCPModelAPI>(`/code_postal_synthese/${codePostal}`);
    return {
      listeCommunes: response.data.liste_communes,
      nombreInscrits: response.data.nombre_inscrits,
      nombrePointsMoyen: response.data.nombre_points_moyen,
      nombreDefiEnCours: response.data.nombre_defis_encours,
      nombreDefiRealises: response.data.nombre_defis_realises,
      nombreArticlesLocaux: response.data.nombre_articles_locaux,
      nombreArticlesTotal: response.data.nombre_articles_total,
      aides: {
        nombreAidesTotal: response.data.nombre_aides_total,
        nombreAidesNatTotal: response.data.nombre_aides_nat_total,
        nombreAidesRegionTotal: response.data.nombre_aides_region_total,
        nombreAidesDepartementTotal: response.data.nombre_aides_departement_total,
        nombreAidesCommuneTotal: response.data.nombre_aides_commune_total,
      },
      thematiques: {
        nombre_aides_alimentation: response.data.count_aide_alimentation,
        nombre_aides_consommation: response.data.count_aide_consommation,
        nombre_aides_logement: response.data.count_aide_logement,
        nombre_aides_transport: response.data.count_aide_transport,
        nombre_aides_dechet: response.data.count_aide_dechet,
        nombre_aides_loisir: response.data.count_aide_loisir,
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
      articles: response.data.liste_id_articles_locaux,
      aidesLocales: response.data.liste_id_aides_locales,
    };
  }

  async recupererDonneesInsee(insee: string): Promise<DonneesCollectivitesINSEE> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<DonneesCollectivitesINSEEModelAPI>(`/code_postal_synthese_v2/${insee}`);
    return {
      nom: response.data.nom_commune_ou_collectivite,
      departement: response.data.nom_departement,
      region: response.data.nom_region,
      estEPCI: response.data.est_EPCI,
      listeCommunesPourEPCI: response.data.liste_communes_dans_EPCI,
      aides: {
        nationales: response.data.liste_aides_nationales,
        regionales: response.data.liste_aides_region,
        departementales: response.data.liste_aides_departement,
        locales: response.data.liste_aides_locales,
      },
      articles: {
        regionales: response.data.liste_articles_region,
        departementales: response.data.liste_articles_departement,
        locales: response.data.liste_articles_locales,
      },

      nombreInscrits: response.data.nombre_inscrits_total,
      nombreInscritsLocaux: response.data.nombre_inscrits_local,
      nombrePointsMoyen: response.data.nombre_points_moyen,
      nombreDefisEnCours: response.data.nombre_defis_encours,
      nombreDefisRealises: response.data.nombre_defis_realises,
    };
  }
}
