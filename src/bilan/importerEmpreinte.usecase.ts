import { EmpreinteRepository } from "@/bilan/ports/empreinteRepository";

export class importerEmpreinteUsecase {
  private _empreinteRepository: EmpreinteRepository;

  constructor(empreinteRepository: EmpreinteRepository) {
    this._empreinteRepository = empreinteRepository;
  }

  async execute(idNGC: string, utilisateurId: string): Promise<boolean> {
    return await this._empreinteRepository.importerSituationNGC(idNGC, utilisateurId);
  }
}
