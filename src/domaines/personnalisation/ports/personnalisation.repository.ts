import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

type PersonnalisationDuneAction = {
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

export interface PersonnalisationRepository {
  recupererTagsPersonnalisation(): Promise<string[]>;

  recupererActionsAvecTags(tags: string[]): Promise<PreviewActionsParThematique>;
}
