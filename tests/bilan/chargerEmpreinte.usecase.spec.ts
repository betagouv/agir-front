import { ChargementEmpreintePresenterImpl, EmpreinteViewModel } from "../../src/bilan/adapters/chargementEmpreinte.presenter.impl";
import { ChargementEmpreinteUsecase } from "../../src/bilan/chargementEmpreinte.usecase";
import { Empreinte, EmpreinteRepository } from "../../src/bilan/ports/empreinteRepository";

class EmpreinteRepositoryForTest implements EmpreinteRepository {
  evaluerEmpreinte(utilisateur: string, situation: string): Promise<Boolean> {
    return Promise.resolve(false);
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
}
describe("Fichier de tests pour le chargement d'une empreinte carbone", () => {
  it("En donnant un nom d'utilisateur doit retourner la valeur du bilan", async () => {
    // GIVEN
    // WHEN
    const useCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryForTest());
    await useCase.execute("Dorian", new ChargementEmpreintePresenterImpl(expectation));
    // THEN
    function expectation(empreinteViewModel: EmpreinteViewModel) {
      expect(empreinteViewModel).toStrictEqual({
        bilan: "6.8",
        detail: {
          alimentation: 2,
          divers: 0.9,
          logement: 1.4,
          servicesSocietaux: 1.6,
          transport: 0.9,
        },
      });
    }
  });
});
