export interface PersonnalisationRepository {
  recupererTagsPersonnalisation(): Promise<string[]>;
}
