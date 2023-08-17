import { EmpreinteRepository } from "@/bilan/ports/empreinteRepository";

export class importEmpreinteUsecase {
  private _empreinteRepository: EmpreinteRepository;

  constructor(empreinteRepository: EmpreinteRepository) {
    this._empreinteRepository = empreinteRepository;
  }

  execute(idNGC: string, utilisateurId: string): Promise<boolean> {
    return this._empreinteRepository.importSituationNGC(idNGC, utilisateurId);
  }
}
