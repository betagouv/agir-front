import { SimulationRetrofit } from "@/aides/simulerAideRetrofit.usecase";
export interface SimulationAidesRetrofitViewModel {
  libelle: string;
  montant: string;
}
export interface SimulerAideRetrofitPresenter {
  presente(simulationRetrofit: SimulationRetrofit): void;
}
