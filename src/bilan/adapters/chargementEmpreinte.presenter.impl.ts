import { Empreinte } from '@/bilan/ports/empreinteRepository';
import { ChargementEmpreintePresenter } from '@/bilan/ports/chargementEmpreinte.presenter';

interface DetailEmpreinteViewModel {
  alimentation: number;
  divers: number;
  logement: number;
  servicesSocietaux: number;
  transport: number;
}
export interface EmpreinteViewModel {
  bilan: string;
  detail: DetailEmpreinteViewModel;
}

export class ChargementEmpreintePresenterImpl implements ChargementEmpreintePresenter {
  private _empreinteViewModel: (viewModel: EmpreinteViewModel) => void;

  constructor(empreinteViewModel: (viewModel: EmpreinteViewModel) => void) {
    this._empreinteViewModel = empreinteViewModel;
  }

  presenteEmpreinte(empreinte: Empreinte): void {
    function transformerEnKiloPuisPasserEnString(valeur: number) {
      return (valeur / 1000).toFixed(1);
    }
    function transformerEnKiloEtArrondirAUn(valeur: number) {
      return parseFloat((valeur / 1000).toFixed(1));
    }

    this._empreinteViewModel({
      bilan: transformerEnKiloPuisPasserEnString(empreinte.bilan),
      detail: {
        alimentation: transformerEnKiloEtArrondirAUn(empreinte.detail.alimentation),
        divers: transformerEnKiloEtArrondirAUn(empreinte.detail.divers),
        logement: transformerEnKiloEtArrondirAUn(empreinte.detail.logement),
        servicesSocietaux: transformerEnKiloEtArrondirAUn(empreinte.detail.servicesSocietaux),
        transport: transformerEnKiloEtArrondirAUn(empreinte.detail.transport),
      },
    });
  }
}
