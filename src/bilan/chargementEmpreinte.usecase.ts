import { ChargementEmpreintePresenterImpl } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
import { EmpreinteRepository } from '@/bilan/ports/empreinteRepository';

export class ChargementEmpreinteUsecase {
  private _empreinteRepository: EmpreinteRepository;

  constructor(empreinteRepository: EmpreinteRepository) {
    this._empreinteRepository = empreinteRepository;
  }

  async execute(username: string, chargementEmpreintePresenterImpl: ChargementEmpreintePresenterImpl) {
    const empreinte = await this._empreinteRepository.getEmpreinte(username);
    chargementEmpreintePresenterImpl.presenteEmpreinte(empreinte);
  }
}
