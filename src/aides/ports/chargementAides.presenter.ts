import { Aides } from "@/aides/chargementAides.usecase";

export interface AidesViewModel {
  [key: Aides['categorie']]: Aides[]
}

export interface ChargementAidesPresenter {
  presente(aides: Aides[]): void;
}
