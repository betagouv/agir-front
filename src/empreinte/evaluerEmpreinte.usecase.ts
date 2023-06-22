import { EvaluerEmpreintePresenter } from "@/empreinte/ports/evaluerEmpreinte.presenter";
import { EmpreinteRepository } from "@/empreinte/ports/empreinteRepository";

export class EvaluerEmpreinteUsecase {
  private _empreinteRepository: EmpreinteRepository;
  constructor(empreinteRepository: EmpreinteRepository) {
    this._empreinteRepository = empreinteRepository;
  }

  async execute(utilisateur: string, situation: string, presenter: EvaluerEmpreintePresenter) {
    await this._empreinteRepository.evaluerEmpreinte(utilisateur, situation);
    presenter.presente(true);
  }
}
