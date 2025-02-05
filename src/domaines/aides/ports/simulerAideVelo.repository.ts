import { EtatVelo, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export interface SimulerAideVeloRepository {
  getSimulation(prixDuVelo: number, etatDuVelo: EtatVelo, utilisateurId: string): Promise<SimulationVelo>;
  getSimulationDepuisInsee(insee: string): Promise<SimulationVelo>;
}
