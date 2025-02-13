import { SimulerAideVeloRepository } from '@/domaines/aides/ports/simulerAideVelo.repository';
import { AidesVeloDisponibles, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export class SimulerAideVeloRepositoryMock implements SimulerAideVeloRepository {
  constructor(
    private simulationVeloARetourner: SimulationVelo,
    private aidesDisponiblesARetourner: AidesVeloDisponibles = [],
  ) {}

  getSimulation(_prixDuVelo: number, _utilisateurId: string): Promise<SimulationVelo> {
    return Promise.resolve(this.simulationVeloARetourner);
  }

  getAidesDisponiblesPourCommuneOuEpci(_code: string): Promise<AidesVeloDisponibles> {
    return Promise.resolve(this.aidesDisponiblesARetourner);
  }
}
