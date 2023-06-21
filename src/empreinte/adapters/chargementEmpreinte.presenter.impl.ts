import { Empreinte } from "@/empreinte/ports/empreinteRepository";
import { ChargementEmpreintePresenter } from "@/empreinte/ports/chargementEmpreinte.presenter";

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
