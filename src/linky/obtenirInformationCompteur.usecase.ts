import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';

export interface InformationCompteur {
  prm: string;
  estConfigure: boolean;
  estActif: boolean;
  estFonctionnel: boolean;
}

export class ObtenirInformationCompteurUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string) {
    return this.linkyRepository.recupererInformationCompteur(idUtilsateur);
  }
}
