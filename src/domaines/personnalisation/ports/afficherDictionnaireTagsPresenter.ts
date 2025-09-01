import { DefinitionTag } from '@/domaines/personnalisation/ports/personnalisation.repository';
import { RouterLinkParams } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

export interface DictionnaireTagsViewModel {
  definitionTags: {
    code: string;
    labelRecommandation: string;
    descriptionInterne: string;
    type: {
      titre: string;
      classColor: string;
    };
    indicationUser: string;
    warnings: string[];
    kycCreationTag: {
      idCms: string;
      code: string;
      question: string;
    }[];
    actionsIncluantes: {
      routerLinkTo: RouterLinkParams;
      titre: string;
    }[];
    actionsExcluantes: {
      routerLinkTo: RouterLinkParams;
      titre: string;
    }[];
  }[];
}

export interface AfficherDictionnaireTagsPresenter {
  presente(definitionTag: DefinitionTag[]): void;
}
