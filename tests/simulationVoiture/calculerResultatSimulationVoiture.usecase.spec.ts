import { describe, expect, it } from 'vitest';
import { SimulateurVoitureRepositoryMock } from './adapters/simulateurVoiture.repository.mock';
import {
  ResultatSimulationVoiturePresenterImpl,
  ResultatSimulationVoitureViewModel,
} from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';
import { CalculerResultatSimulationVoitureUsecase } from '@/domaines/simulationVoiture/calculerResultatSimulationVoiture.usecase';
import { MontantAfficheEnFR, NombreAfficheEnFR } from '@/shell/nombreAfficheEnFRBuilder';

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
          coutAnnuel: '25 000 €' as MontantAfficheEnFR,
          emissionAnnuelle: '100' as NombreAfficheEnFR,
          gabarit: 'SUV',
          tag: ['Électricité', 'Électrique'],
        },
        resultatVoiturePlusEcologique: {
          coutAnnuel: {
            difference: 1000,
            labelDifference: '+1 000 €',
            montant: '26 000 €' as MontantAfficheEnFR,
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 10,
            labelDifference: '10%',
            montant: '110' as NombreAfficheEnFR,
            style: 'fr-badge--warning',
          },
          tag: ['Diesel', 'Diesel'],
          typeDeVoiture: 'Voiture C',
        },
        resultatVoiturePlusEconomique: {
          coutAnnuel: {
            difference: 1000,
            labelDifference: '+1 000 €',
            montant: '26 000 €' as MontantAfficheEnFR,
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 10,
            labelDifference: '10%',
            montant: '110' as NombreAfficheEnFR,
            style: 'fr-badge--warning',
          },
          tag: ['Diesel', 'Diesel'],
          typeDeVoiture: 'Voiture C',
        },
      });
    }
  });
});
