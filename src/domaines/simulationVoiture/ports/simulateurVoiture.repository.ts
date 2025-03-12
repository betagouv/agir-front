import { ResultatSimulationVoiture } from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';

export interface SimulationVoitureRepository {
  recupererResultats(utilisateurId: string): Promise<ResultatSimulationVoiture>;
}
