import { Interaction } from "@/interactions/chargerInteractions.usecase";

export interface InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]>;
  interactionAEteCliquee(interactionId: string, utilisateurId): void;
  interactionAEteTerminee(interactionId: string, utilisateurId: string): void;
}
