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
          gabarit: 'Berline',
          hypotheses: [
            {
              label: "Achat d'occasion",
              valeur: 'Oui',
              unite: undefined,
            },
            {
              label: 'Prix carburant',
              valeur: '1,65',
              unite: '€/l',
            },
          ],
          tag: ['Essence', 'Thermique'],
        },
        resultatVoiturePlusEcologique: {
          coutAnnuel: {
            difference: 3000,
            labelDifference: '+3 000 €',
            montant: '22 000 €' as MontantAfficheEnFR,
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 40,
            labelDifference: '40%',
            montant: '60' as NombreAfficheEnFR,
            style: 'fr-badge--warning',
          },
          tag: ['Électricité', 'Électrique'],
          typeDeVoiture: 'Voiture B',
        },
        resultatVoiturePlusEconomique: {
          coutAnnuel: {
            difference: 7000,
            labelDifference: '+7 000 €',
            montant: '18 000 €' as MontantAfficheEnFR,
            style: 'fr-badge--warning',
          },
          emission: {
            difference: 20,
            labelDifference: '20%',
            montant: '80' as NombreAfficheEnFR,
            style: 'fr-badge--warning',
          },
          tag: ['Essence', 'Hybride'],
          typeDeVoiture: 'Voiture A',
        },
      });
    }
  });
});
