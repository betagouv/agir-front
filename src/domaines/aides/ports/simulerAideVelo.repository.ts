import { SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export interface SimulerAideVeloRepository {
  getSimulation(prixDuVelo: number, utilisateurId: string): Promise<SimulationVelo>;
}
