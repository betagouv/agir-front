export type AccueilConnecte = {
  commune: string;
  totalActionsNationalesFaites: number;
  totalActionsUtilisateurFaites: number;
  pourcentageCompletionBilan: number;
  bilanCarboneTotalKg: number;
  nombreAides: number;
  nombreRecettes: number;
  pourcentageGlobalRecommandations: number;
  pourcentageAlimentationRecommandations: number;
  pourcentageConsommationRecommandations: number;
  pourcentageLogementRecommandations: number;
  pourcentageTransportRecommandations: number;
};

export interface AccueilConnecteRepository {
  recupererAccueilConnecte(utilisateurId: string): Promise<AccueilConnecte>;
}
