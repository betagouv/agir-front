export enum Evenemement {
  AIDES_CONSULTEES = 'access_catalogue_aides',
  COMPTE_CONSULTE = 'access_profile',
}
export interface PublierEvenementRepository {
  publierEvenement(utilisateurId: string, evenement: Evenemement): Promise<void>;
}
