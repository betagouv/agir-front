export type AccueilConnecte = {
  commune: string;
  totalActionsNationalesFaites: number;
  totalActionsUtilisateurFaites: number;
  pourcentageCompletionBilan: number;
  nombreAides: number;
  nombreRecettes: number;
};

export interface AccueilConnecteRepository {
  recupererAccueilConnecte(utilisateurId: string): Promise<AccueilConnecte>;
}
