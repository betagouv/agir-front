import { Aides } from '@/aides/chargementAides.usecase';

export interface ChargementAidesRepository {
  getAides(): Promise<Aides[]>;
}
