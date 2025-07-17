import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export type PersonnalisationDuneAction = {
  thematique: ClefThematiqueAPI;
  titre: string;
  type: 'classique' | 'exclue';
  pourcentageReco: number;
  estExclue: boolean;
};

export interface PreviewActionsParThematique {
  logement: PersonnalisationDuneAction[];
  transport: PersonnalisationDuneAction[];
  consommation: PersonnalisationDuneAction[];
  alimentation: PersonnalisationDuneAction[];
}

export interface MappingTagKYC {
  mappedKYCListe: {
    kyc: string;
    tags: string[];
  }[];
  tagAtteignableViaKYC: string[];
  tagInatteignableViaKYC: string[];
  tagsDynamiques: {
    tag: string;
    explication: string;
  }[];
  tagsCmsHorsDuBackend: {
    idCms: string;
    tagId: string;
    labelExplicationFront: string;
    descriptionInterne: string;
    ponderation: number;
    boost: number;
  }[];
  backEndTagHorsDuCms: string[];
  tousLesTagsDansCms: {
    id_cms: string;
    tag_id: string;
    label_explication_front: string;
    description_interne: string;
    ponderation: number;
    boost: number;
  }[];
}

export interface PersonnalisationRepository {
  recupererTagsPersonnalisation(): Promise<string[]>;

  recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique>;

  recupererMappingTagKYC(): Promise<MappingTagKYC>;
}
