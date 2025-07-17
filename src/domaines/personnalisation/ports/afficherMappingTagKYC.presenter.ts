import { MappingTagKYC } from '@/domaines/personnalisation/ports/personnalisation.repository';

export interface MappingTagKYCViewModel {
  tags: {
    code: string;
    description: string;
    descriptionInterne: string;
    descriptionDynamique: string;
    type: 'editorial' | 'utilisateur';
    estAtteignableViaKYC: boolean;
    estInatteignableViaKYC: boolean;
    estHorsDuBackend: boolean;
  }[];

  tagBackEndHorsDuCms: string[];
}

export interface AfficherMappingTagKYCPresenter {
  presente(mappingTagKYC: MappingTagKYC): void;
}
