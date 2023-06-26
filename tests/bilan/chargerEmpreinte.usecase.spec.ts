import { ChargementEmpreintePresenterImpl, EmpreinteViewModel } from "../../src/bilan/adapters/chargementEmpreinte.presenter.impl";
import { ChargementEmpreinteUsecase } from "../../src/bilan/chargementEmpreinte.usecase";
import { Empreinte, EmpreinteRepository } from "../../src/bilan/ports/empreinteRepository";

class EmpreinteRepositoryForTest implements EmpreinteRepository {
  evaluerEmpreinte(utilisateur: string, situation: string): Promise<Boolean> {
    return Promise.resolve(false);
  }

  getEmpreinte(username: string): Promise<Empreinte> {
    return Promise.resolve({
      bilan: "1000",
    });
  }
}
describe("Fichier de tests pour le chargement d'une empreinte carbone", () => {
  it("En donnant un nom d'utilisateur doit retourner la valeur du bilan", () => {
    // GIVEN
    // WHEN
    const useCase = new ChargementEmpreinteUsecase(new EmpreinteRepositoryForTest());
    useCase.execute("Dorian", new ChargementEmpreintePresenterImpl(expectation));
    // THEN
    function expectation(empreinteViewModel: EmpreinteViewModel) {
      expect(empreinteViewModel).toStrictEqual({
        bilan: "1000",
      });
    }
  });
});
