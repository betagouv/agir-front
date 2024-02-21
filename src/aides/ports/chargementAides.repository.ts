import { Aides } from '@/aides/chargementAides.usecase';

export interface ChargementAidesRepository {
  getAides(codePostal: string): Promise<Aides[]>;
}
