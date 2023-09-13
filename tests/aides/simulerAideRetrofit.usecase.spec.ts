import { SimulerAideRetrofitRepository } from "../../src/aides/ports/simulerAideRetrofit.repository";
import { SimulerAideRetrofitPresenterImpl } from "../../src/aides/adapters/simulerAideRetrofit.presenter.impl";
import SimulerAideRetrofitUsecase, { SimulationRetrofit } from "../../src/aides/simulerAideRetrofit.usecase";
import { SimulationAideResultatViewModel } from "../../src/aides/ports/simulationAideResultat";

class SimulerAideRetrofitRepositoryForTest implements SimulerAideRetrofitRepository {
  getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit> {
    return Promise.resolve({
      aides: [
        {
          libelle: "Aide de votre région",
          montant: "1000",
          lien: "https://www.grandlyon.com/fileadmin/user_upload/media/pdf/deplacements/zfe/20220624_zfe_aides-particuliers_reglement.pdf",
        },
      ],
    });
  }
}

describe("Fichier de tests pour simuler une aide retrofit", () => {
  it("En donnant un code postal et un revenu fiscal de référence doit me retourner une liste d'aide", async () => {
    // GIVEN
    // WHEN
    const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryForTest());
    await useCase.execute("codePostal", "revenuFiscalDeReference", new SimulerAideRetrofitPresenterImpl(expectation));

    // THEN
    function expectation(simulationAidesRetrofitViewModel: SimulationAideResultatViewModel) {
      expect(simulationAidesRetrofitViewModel).toStrictEqual(
        {
          "Prime au retrofit":
          [{
            libelle: "Aide de votre région",
            montant: 1000,
            lien: "https://www.grandlyon.com/fileadmin/user_upload/media/pdf/deplacements/zfe/20220624_zfe_aides-particuliers_reglement.pdf",
            logo: 'to define'
          },
        ]}
      );
    }
  });
});
