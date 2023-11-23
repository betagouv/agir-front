export interface InteractionsRepository {
  interactionAEteTerminee(interactionId: string, utilisateurId: string): void;
}
