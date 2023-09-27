import { Interaction } from '@/interactions/chargerInteractions.usecase';

export interface InteractionsPresenter {
  presente(interactions: Interaction[]);
}
