import { ConformiteRepository } from '@/domaines/conformites/ports/conformite.repository';

export interface PageConformite {
  texte: string;
  titre: string;
}

export enum PageConformiteType {
  MENTIONS_LEGALES = 'mention_legale',
  CGU = 'cgu',
  CONFIDENTIALITE = 'confidentialite',
  ACCESSIBILITE = 'accessibilite',
  CHARTE = 'charte_exp',
}

export class RecupererPageConformiteUsecase {
  constructor(private conformiteRepository: ConformiteRepository) {}

  async execute(pageConfirmite: PageConformiteType): Promise<PageConformite> {
    return await this.conformiteRepository.recupererPageConformite(pageConfirmite);
  }
}
