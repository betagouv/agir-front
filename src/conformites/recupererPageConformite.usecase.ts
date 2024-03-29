import { ConformiteRepository } from '@/conformites/ports/conformite.repository';

export interface PageConformite {
  texte: string;
  titre: string;
}

export enum PageConformiteType {
  MENTIONS_LEGALES = 1,
  CGU = 2,
  CONFIDENTIALITE = 3,
  ACCESSIBILITE = 4,
}

export class RecupererPageConformiteUsecase {
  constructor(private conformiteRepository: ConformiteRepository) {}

  async execute(pageConfirmite: PageConformiteType): Promise<PageConformite> {
    return await this.conformiteRepository.recupererPageConformite(pageConfirmite);
  }
}
