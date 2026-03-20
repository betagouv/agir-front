import { describe, expect, it } from 'vitest';
import { SimulateurVoitureRepositoryMock } from './adapters/simulateurVoiture.repository.mock';
import {
  ResultatSimulationVoiturePresenterImpl,
  ResultatSimulationVoitureViewModel,
} from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';
import { CalculerResultatSimulationVoitureUsecase } from '@/domaines/simulationVoiture/calculerResultatSimulationVoiture.usecase';
import { MontantAfficheEnFR, NombreAfficheEnFR } from '@/shell/formatting/nombreAfficheEnFRBuilder';

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
        },
        resultatVoiturePlusEcologique: {
          economies: {
            difference: 3000,
            labelDifference: '-3000',
            style: 'fr-badge--success',
          },
          emission: {
            difference: 40,
            labelDifference: '-40',
            style: 'fr-badge--success',
          },
          typeDeVoiture: "Voiture B d'occasion",
          cout: {
            coutAchatNet: '10 000 €' as MontantAfficheEnFR,
            prixAchat: '20 000 €' as MontantAfficheEnFR,
          },
          dureeSeuilRentabilite: {
            valeur: 10,
            unite: 'ans',
          },
          economiesTotales: '100 000 €' as MontantAfficheEnFR,
          montantAide: undefined,
        },
        resultatVoiturePlusEconomique: {
          economies: {
            difference: 3000,
            labelDifference: '-3000',
            style: 'fr-badge--success',
          },
          emission: {
            difference: 20,
            labelDifference: '-20',
            style: 'fr-badge--success',
          },
          typeDeVoiture: "Voiture A moins économique mais moins cher à l'achat",
          cout: {
            coutAchatNet: '5 000 €' as MontantAfficheEnFR,
            prixAchat: '10 000 €' as MontantAfficheEnFR,
          },
          dureeSeuilRentabilite: {
            valeur: 5,
            unite: 'ans',
          },
          economiesTotales: '1 000 000 €' as MontantAfficheEnFR,
          montantAide: '4 000 €' as MontantAfficheEnFR,
        },
      });
    }
  });
});
