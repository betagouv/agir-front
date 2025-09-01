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

export interface DefinitionTag {
  code: string;
  labelRecommandation: string;
  descriptionInterne: string;
  warnings: {
    estCmsDeclarationManquante: boolean;
    estBackendDeclarationManquante: boolean;
    estActivationFonctionnelleAbsente: boolean;
  };
  type: 'user_kyc' | 'user_computed' | 'editorial';
  pourcentageUserAvecTag: number;
  nombreUserAvecTag: number;
  kycCreationTag: {
    idCms: string;
    code: string;
    question: string;
  }[];
  actionsIncluantes: {
    idCms: string;
    code: string;
    type: string;
    titre: string;
    thematique: ClefThematiqueAPI;
  }[];
  actionsExcluantes: {
    idCms: string;
    code: string;
    type: string;
    titre: string;
    thematique: ClefThematiqueAPI;
  }[];
}

export interface PersonnalisationRepository {
  recupererTagsPersonnalisation(): Promise<string[]>;

  recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique>;

  recupererDictionnaireTags(): Promise<DefinitionTag[]>;
}
