import { Aides } from '@/domaines/aides/chargementAides.usecase';

export interface ChargementAidesRepository {
  getAides(codePostal: string): Promise<Aides[]>;
}
