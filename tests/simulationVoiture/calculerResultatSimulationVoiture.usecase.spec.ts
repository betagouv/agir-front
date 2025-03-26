import { describe, expect, it } from 'vitest';
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
          emissionAnnuelle: '100',
          tag: ['Électricité', 'Électrique'],
        },
        resultatVoiturePlusEconomique: {
          typeDeVoiture: 'Voiture A',
          coutAnnuel: { montant: 18000, difference: -7000, label: '-7000€', style: 'fr-badge--success' },
          emission: { montant: 80, difference: -20, label: '-20%', style: 'fr-badge--success' },
          tag: ['Essence', 'Hybride'],
        },
        resultatVoiturePlusEcologique: {
          typeDeVoiture: 'Voiture B',
          coutAnnuel: { montant: 22000, difference: -3000, label: '-3000€', style: 'fr-badge--success' },
          emission: { montant: 60, difference: -40, label: '-40%', style: 'fr-badge--success' },
          tag: ['Électricité', 'Électrique'],
        },
      });
    }
  });
});
