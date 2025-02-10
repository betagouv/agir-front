import { AidesVeloDisponibles, EtatVelo, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export interface SimulerAideVeloRepository {
  getSimulation(prixDuVelo: number, etatDuVelo: EtatVelo, utilisateurId: string): Promise<SimulationVelo>;
  getAidesDisponiblesPourCommuneOuEpci(code: string): Promise<AidesVeloDisponibles>;
}
