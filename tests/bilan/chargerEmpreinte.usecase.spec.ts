import {
  ChargementEmpreintePresenterImpl,
  EmpreinteViewModel,
} from '../../src/bilan/adapters/chargementEmpreinte.presenter.impl';
import { ChargementEmpreinteUsecase } from '../../src/bilan/chargementEmpreinte.usecase';
import { Empreinte, EmpreinteRepository } from '../../src/bilan/ports/empreinteRepository';

class EmpreinteRepositoryForTest implements EmpreinteRepository {
  importerSituationNGC(idNGC: string, utilisateurId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getEmpreinte(username: string): Promise<Empreinte> {
    return Promise.resolve({
      bilan: 6770.336671393776,
      detail: {
        alimentation: 2033.7441687666667,
        divers: 852.8584599753638,
        logement: 1424.3853917865213,
        servicesSocietaux: 1553.6358095597056,
        transport: 905.7128413055185,
      },
    });
  }
  importSituationNGC(situationId: string, utilisateurId: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe("Fichier de tests pour le chargement d'une empreinte carbone", () => {
  it("En donnant un nom d'utilisateur doit retourner la valeur du bilan", async () => {
    // GIVEN
    // WHEN
    const useCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryForTest());
    await useCase.execute('Dorian', new ChargementEmpreintePresenterImpl(expectation));

    // THEN
    function expectation(empreinteViewModel: EmpreinteViewModel) {
      expect(empreinteViewModel).toStrictEqual({
        bilan: '6.8',
        details: [
          {
            couleur: '#F28622',
            libelle: '🥦 Alimentation',
            valeur: 2,
          },
          {
            couleur: '#809769',
            libelle: '🏛️ Services sociétaux',
            valeur: 1.6,
          },
          {
            couleur: '#F8BE00',
            libelle: '🏡 Logement',
            valeur: 1.4,
          },
          {
            couleur: '#474EFF',
            libelle: '🚗 Transports',
            valeur: 0.9,
          },
          {
            couleur: '#5C26D1',
            libelle: '🛒 Consommation',
            valeur: 0.9,
          },
        ],
        valeurMax: 2,
      });
    }
  });
});
