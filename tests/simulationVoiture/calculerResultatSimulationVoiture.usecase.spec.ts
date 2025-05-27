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
          coutAnnuel: '25 000',
          emissionAnnuelle: '100',
          gabarit: 'SUV',
          tag: ['Électricité', 'Électrique'],
        },
        resultatVoiturePlusEcologique: {
          coutAnnuel: {
            difference: 1000,
            label: '+1 000€',
            montant: '26 000',
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 10,
            label: '10%',
            montant: '110',
            style: 'fr-badge--warning',
          },
          tag: ['Diesel', 'Diesel'],
          typeDeVoiture: 'Voiture C',
        },
        resultatVoiturePlusEconomique: {
          coutAnnuel: {
            difference: 1000,
            label: '+1 000€',
            montant: '26 000',
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 10,
            label: '10%',
            montant: '110',
            style: 'fr-badge--warning',
          },
          tag: ['Diesel', 'Diesel'],
          typeDeVoiture: 'Voiture C',
        },
      });
    }
  });
});
