import { Interaction } from "@/interactions/chargerInteractions.usecase";

export interface InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]>;
}
