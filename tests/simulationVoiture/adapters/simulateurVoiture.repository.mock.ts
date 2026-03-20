import {
  ResultatSimulationVoiture,
  VoitureActuelle,
  VoitureAlternative,
  VoitureParam,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { SimulationVoitureRepository } from '@/domaines/simulationVoiture/ports/simulateurVoiture.repository';

export class SimulateurVoitureRepositoryMock implements SimulationVoitureRepository {
  recupererResultats(_utilisateurId: string): Promise<ResultatSimulationVoiture> {
    const voitureActuelle = new VoitureActuelle(
      25000,
      100,
      'Berline',
      'Thermique',
      'Essence',
      [
        new VoitureParam('voiture . occasion', "Achat d'occasion", 'Oui'),
        new VoitureParam('voiture . thermique . prix carburant', 'Prix carburant', '1,65', '€/l'),
      ],
      false,
    );

    const voituresAlternative = [
      new VoitureAlternative(
        18000,
        80,
        'Berline',
        'Hybride',
        'Essence',
        false,
        'Voiture A',
        100 - 80,
        25000 - 18000,
        10000,
        20000,
        8000,
        4000,
        10,
        1000000,
      ),
      new VoitureAlternative(
        22000,
        80,
        'Berline',
        'Hybride',
        'Essence',
        false,
        "Voiture A moins économique mais moins cher à l'achat",
        100 - 80,
        25000 - 22000,
        5000,
        10000,
        8000,
        4000,
        5,
        1000000,
      ),
      new VoitureAlternative(
        22000,
        60,
        'Berline',
        'Électrique',
        'Électricité',
        true,
        'Voiture B',
        100 - 60,
        25000 - 22000,
        10000,
        20000,
        8500,
        0,
        10,
        100000,
      ),
      new VoitureAlternative(
        26000,
        110,
        'SUV',
        'Diesel',
        'Diesel',
        false,
        'Voiture C',
        100 - 110,
        25000 - 26000,
        10000,
        2000,
        8000,
        4000,
        10,
        1000000,
      ),
    ];

    const simulation = new ResultatSimulationVoiture(voitureActuelle, voituresAlternative);

    return Promise.resolve(simulation);
  }
}
