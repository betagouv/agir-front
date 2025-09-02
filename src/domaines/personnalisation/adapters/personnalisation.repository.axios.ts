import { AxiosFactory } from '@/axios.factory';
import {
  DefinitionTag,
  PersonnalisationRepository,
  PreviewActionsParThematique,
} from '@/domaines/personnalisation/ports/personnalisation.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

type PersonnalisationDuneActionApiModel = {
  thematique: ClefThematiqueAPI;
  titre: string;
  type: 'classique' | 'exclue' | 'bilan' | 'simulateur' | 'quizz';
  pourcentage_reco: number;
  est_exclue: boolean;
};

interface PreviewActionsParThematiqueApiModel {
  logement: PersonnalisationDuneActionApiModel[];
  transport: PersonnalisationDuneActionApiModel[];
  consommation: PersonnalisationDuneActionApiModel[];
  alimentation: PersonnalisationDuneActionApiModel[];
}

interface DefinitionTagApiModel {
  code: string;
  label_recommandation: string;
  description_interne: string;
  warnings: {
    est_cms_declaration_manquante: false;
    est_backend_declaration_manquante: false;
    est_activation_fonctionnelle_absente: false;
  };
  type: 'user_kyc' | 'user_computed' | 'editorial';
  pourcentage_user_avec_tag: number;
  nombre_user_avec_tag: number;
  kyc_creation_tag: {
    id_cms: string;
    code: string;
    question: string;
  }[];
  actions_incluantes: {
    id_cms: string;
    code: string;
    type: string;
    titre: string;
    thematique: ClefThematiqueAPI;
  }[];
  actions_excluantes: {
    id_cms: string;
    code: string;
    type: string;
    titre: string;
    thematique: ClefThematiqueAPI;
  }[];
}

export class PersonnalisationRepositoryAxios implements PersonnalisationRepository {
  async recupererTagsPersonnalisation(): Promise<string[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<string[]>(`/tags`);
    return response.data;
  }

  async recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique> {
    const axios = AxiosFactory.getAxios();

    const response = await axios.post<PreviewActionsParThematiqueApiModel>(`/tags/simuler`, {
      liste_tags: tags,
    });

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

  async recupererDictionnaireTags(): Promise<DefinitionTag[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<DefinitionTagApiModel[]>(`/tags/dictionnaire`);
    return response.data.map(tag => ({
      code: tag.code,
      labelRecommandation: tag.label_recommandation,
      descriptionInterne: tag.description_interne,
      warnings: {
        estCmsDeclarationManquante: tag.warnings.est_cms_declaration_manquante,
        estBackendDeclarationManquante: tag.warnings.est_backend_declaration_manquante,
        estActivationFonctionnelleAbsente: tag.warnings.est_activation_fonctionnelle_absente,
      },
      type: tag.type,
      pourcentageUserAvecTag: tag.pourcentage_user_avec_tag,
      nombreUserAvecTag: tag.nombre_user_avec_tag,
      kycCreationTag: tag.kyc_creation_tag.map(kyc => ({
        idCms: kyc.id_cms,
        code: kyc.code,
        question: kyc.question,
      })),
      actionsIncluantes: tag.actions_incluantes.map(action => ({
        idCms: action.id_cms,
        code: action.code,
        type: action.type,
        titre: action.titre,
        thematique: action.thematique,
      })),
      actionsExcluantes: tag.actions_excluantes.map(action => ({
        idCms: action.id_cms,
        code: action.code,
        type: action.type,
        titre: action.titre,
        thematique: action.thematique,
      })),
    }));
  }
}
