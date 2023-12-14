export enum Evenemement {
  AIDES_CONSULTEES = 'access_catalogue_aides',
}
export interface PublierEvenementRepository {
  publierEvenement(utilisateurId: string, evenement: Evenemement): Promise<void>;
}
