import { describe, it, expect } from 'vitest';
import { SimulateurVoitureRepositoryMock } from './adapters/simulateurVoiture.repository.mock';
import {
  ResultatSimulationVoiturePresenterImpl,
  ResultatSimulationVoitureViewModel,
} from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';
import { CalculerResultatSimulationVoitureUsecase } from '@/domaines/simulationVoiture/calculerResultatSimulationVoiture.usecase';

describe('CalculerResultatSimulationVoitureUsecase', () => {
  it('Renvoie les résultats de simulation correctement', async () => {
    // GIVEN
    const repository = new SimulateurVoitureRepositoryMock();
    const presenter = new ResultatSimulationVoiturePresenterImpl(expectation);
    const usecase = new CalculerResultatSimulationVoitureUsecase(repository);

    // WHEN
    await usecase.execute('utilisateur123', presenter);

    // THEN
    function expectation(vm: ResultatSimulationVoitureViewModel) {
      expect(vm).toStrictEqual<ResultatSimulationVoitureViewModel>({
        resultatVoitureActuelle: {
          gabarit: 'SUV',
          coupAnnuel: '25000',
          emissionAnnuelle: '120',
          tag: ['Électricité', 'Électrique'],
        },
        resultatVoiturePlusEconomique: {
          typeDeVoiture: 'Voiture A',
          coutAnnuel: { montant: 18000, difference: -7000 },
          emission: { montant: 100, difference: -20 },
          tag: ['Essence', 'Hybride'],
        },
        resultatVoiturePlusEcologique: {
          typeDeVoiture: 'Voiture B',
          coutAnnuel: { montant: 22000, difference: -3000 },
          emission: { montant: 90, difference: -30 },
          tag: ['Électricité', 'Électrique'],
        },
      });
    }
  });
});
