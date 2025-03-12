import {
  ResultatSimulationVoiture,
  VoitureActuelle,
  VoitureAlternative,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { SimulationVoitureRepository } from '@/domaines/simulationVoiture/ports/simulateurVoiture.repository';

export class SimulateurVoitureRepositoryMock implements SimulationVoitureRepository {
  recupererResultats(utilisateurId: string): Promise<ResultatSimulationVoiture> {
    const voitureActuelle = new VoitureActuelle(25000, 120, 'SUV', 'Électrique', 'Électricité');

    const voituresAlternative = [
      new VoitureAlternative(18000, 100, 'Berline', 'Hybride', 'Essence', 'Voiture A'),
      new VoitureAlternative(22000, 90, 'Compacte', 'Électrique', 'Électricité', 'Voiture B'),
      new VoitureAlternative(26000, 110, 'SUV', 'Diesel', 'Diesel', 'Voiture C'),
    ];

    const simulation = new ResultatSimulationVoiture(voitureActuelle, voituresAlternative);

    return Promise.resolve(simulation);
  }
}
