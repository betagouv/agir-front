import { AxiosFactory } from '@/axios.factory';
import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface AideOuArticleCollectiviteModelAPI {
  id: number;
  thematiques: ClefThematiqueAPI[];
  titre: string;
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
  nombre_inscrits_local_dernier_mois: number;
  nombre_points_moyen: number;
  nombre_defis_encours: number;
  nombre_defis_realises: number;

  pourcent_actions_logement: number;
  pourcent_actions_transport: number;
  pourcent_actions_consommation: number;
  pourcent_actions_alimentation: number;
}

export class DonneesCollectivitesRepositoryAxios implements DonneesCollectivitesRepository {
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
      actionsRepartitionParThematiques: {
        logement: response.data.pourcent_actions_logement,
        transport: response.data.pourcent_actions_transport,
        consommation: response.data.pourcent_actions_consommation,
        alimentation: response.data.pourcent_actions_alimentation,
      },

      nombreInscrits: response.data.nombre_inscrits_total,
      nombreInscritsLocaux: response.data.nombre_inscrits_local,
      nombreInscritsLocauxDernierMois: response.data.nombre_inscrits_local_dernier_mois,
      nombrePointsMoyen: response.data.nombre_points_moyen,
      nombreDefisEnCours: response.data.nombre_defis_encours,
      nombreDefisRealises: response.data.nombre_defis_realises,
    };
  }
}
