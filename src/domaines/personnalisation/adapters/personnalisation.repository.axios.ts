import { AxiosFactory } from '@/axios.factory';
import {
  MappingTagKYC,
  PersonnalisationRepository,
  PreviewActionsParThematique,
} from '@/domaines/personnalisation/ports/personnalisation.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

type PersonnalisationDuneActionApiModel = {
  thematique: ClefThematiqueAPI;
  titre: string;
  type: 'classique' | 'exclue';
  pourcentage_reco: number;
  est_exclue: boolean;
};

interface PreviewActionsParThematiqueApiModel {
  logement: PersonnalisationDuneActionApiModel[];
  transport: PersonnalisationDuneActionApiModel[];
  consommation: PersonnalisationDuneActionApiModel[];
  alimentation: PersonnalisationDuneActionApiModel[];
}

interface MappingTacKYCApiModel {
  mapped_kyc_liste: {
    kyc: string;
    tags: string[];
  }[];
  reachable_tags_via_kycs: string[];
  unreachable_tags_via_kyc: string[];
  dynamic_tags: {
    tag: string;
    explication: string;
  }[];
  cms_tags_not_in_backend: {
    id_cms: string;
    tag_id: string;
    label_explication_front: string;
    description_interne: string;
    ponderation: number;
    boost: number;
  }[];
  backend_tags_not_in_cms: string[];
  full_cms_tag_collection: {
    id_cms: string;
    tag_id: string;
    label_explication_front: string;
    description_interne: string;
    ponderation: number;
    boost: number;
  }[];
}

export class PersonnalisationRepositoryAxios implements PersonnalisationRepository {
  async recupererTagsPersonnalisation(): Promise<string[]> {
    return [
      'est_proprietaire',
      'n_est_pas_proprietaire',
      'est_locataire',
      'mange_de_la_viande',
      'prend_l_avion',
      'a_une_voiture',
      'n_a_pas_de_voiture',
      'ne_prend_pas_avion',
      'a_un_velo',
      'a_une_voiture_thermique',
      'a_une_voiture_electrique',
      'ne_mange_pas_de_viande_rouge',
      'ne_mange_pas_de_viande',
      'mange_de_saison',
      'ne_mange_pas_de_saison',
      'composte',
      'ne_composte_pas',
      'ne_mange_pas_local',
      'mange_local',
      'a_un_jardin',
      'n_a_pas_de_jardin',
      'a_chauffage_elec',
      'n_a_pas_chauffage_elec',
      'a_fait_travaux_recents',
      'prend_soin_objets',
      'achete_peu_et_occasion',
      'vit_en_appart',
      'vit_en_maison',
      'est_un_contenu_local',
      'appetence_thematique_logement',
      'appetence_thematique_transport',
      'appetence_thematique_consommation',
      'appetence_thematique_alimentation',
      'habite_zone_peri_urbaine',
      'habite_zone_urbaine',
      'habite_zone_rurale',
      'contenu_important',
    ];
  }

  async recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique> {
    const axios = AxiosFactory.getAxios();

    const params = new URLSearchParams();
    tags.forEach(tag => params.append('tag', tag));

    const response = await axios.get<PreviewActionsParThematiqueApiModel>(
      `/recommandation/simulateur_actions_recommandees`,
      {
        params,
      },
    );

    return {
      logement: response.data.logement.map(action => ({
        thematique: action.thematique,
        titre: action.titre,
        type: action.type,
        pourcentageReco: action.pourcentage_reco,
        estExclue: action.est_exclue,
      })),
      transport: response.data.transport.map(action => ({
        thematique: action.thematique,
        titre: action.titre,
        type: action.type,
        pourcentageReco: action.pourcentage_reco,
        estExclue: action.est_exclue,
      })),
      consommation: response.data.consommation.map(action => ({
        thematique: action.thematique,
        titre: action.titre,
        type: action.type,
        pourcentageReco: action.pourcentage_reco,
        estExclue: action.est_exclue,
      })),
      alimentation: response.data.alimentation.map(action => ({
        thematique: action.thematique,
        titre: action.titre,
        type: action.type,
        pourcentageReco: action.pourcentage_reco,
        estExclue: action.est_exclue,
      })),
    };
  }

  async recupererMappingTagKYC(): Promise<MappingTagKYC> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<MappingTacKYCApiModel>(`/recommandation/mapping_kyc_tags`);

    return {
      mappedKYCListe: response.data.mapped_kyc_liste.map(item => ({
        kyc: item.kyc,
        tags: item.tags,
      })),
      tagAtteignableViaKYC: response.data.reachable_tags_via_kycs,
      tagInatteignableViaKYC: response.data.unreachable_tags_via_kyc,
      tagsDynamiques: response.data.dynamic_tags.map(tag => ({
        tag: tag.tag,
        explication: tag.explication,
      })),
      tagsCmsHorsDuBackend: response.data.cms_tags_not_in_backend.map(tag => ({
        idCms: tag.id_cms,
        tagId: tag.tag_id,
        labelExplicationFront: tag.label_explication_front,
        descriptionInterne: tag.description_interne,
        ponderation: tag.ponderation,
        boost: tag.boost,
      })),
      backEndTagHorsDuCms: response.data.backend_tags_not_in_cms,
      tousLesTagsDansCms: response.data.full_cms_tag_collection.map(tag => ({
        id_cms: tag.id_cms,
        tag_id: tag.tag_id,
        label_explication_front: tag.label_explication_front,
        description_interne: tag.description_interne,
        ponderation: tag.ponderation,
        boost: tag.boost,
      })),
    };
  }
}
