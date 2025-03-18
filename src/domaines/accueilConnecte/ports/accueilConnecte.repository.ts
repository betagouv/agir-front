export type AccueilConnecte = {
  commune: string;
  totalActionsNationalesFaites: number;
  totalActionsUtilisateurFaites: number;
  pourcentageCompletionBilan: number;
};

export interface AccueilConnecteRepository {
  recupererAccueilConnecte(utilisateurId: string): Promise<AccueilConnecte>;
}
