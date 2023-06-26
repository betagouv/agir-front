import { Empreinte } from "@/bilan/ports/empreinteRepository";
import { ChargementEmpreintePresenter } from "@/bilan/ports/chargementEmpreinte.presenter";

export interface EmpreinteViewModel {
  bilan: string;
}

export class ChargementEmpreintePresenterImpl implements ChargementEmpreintePresenter {
  private _empreinteViewModel: (viewModel: EmpreinteViewModel) => void;

  constructor(empreinteViewModel: (viewModel: EmpreinteViewModel) => void) {
    this._empreinteViewModel = empreinteViewModel;
  }

  presenteEmpreinte(empreinte: Empreinte): void {
    this._empreinteViewModel({
      bilan: empreinte.bilan,
    });
  }
}
