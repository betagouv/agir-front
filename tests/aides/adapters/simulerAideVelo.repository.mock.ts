import { SimulerAideVeloRepository } from '@/domaines/aides/ports/simulerAideVelo.repository';
import { SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export class SimulerAideVeloRepositoryMock implements SimulerAideVeloRepository {
  constructor(private simulationVeloARetourner: SimulationVelo) {}

  getSimulation(_prixDuVelo: number, _utilisateurId: string): Promise<SimulationVelo> {
    return Promise.resolve(this.simulationVeloARetourner);
  }
}
