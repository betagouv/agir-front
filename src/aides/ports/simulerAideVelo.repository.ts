import { SimulationVelo } from '@/aides/simulerAideVelo.usecase';

export interface SimulerAideVeloRepository {
  getSimulation(prixDuVelo: number, utilisateurId: string): Promise<SimulationVelo>;
}
