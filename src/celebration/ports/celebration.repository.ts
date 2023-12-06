export interface CelebrationRepository {
  valider(utilisateurId: string, celebrationId: string): void;
}
