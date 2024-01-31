import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { ConsommationElectrique } from '@/linky/obtenirConsommationElectrique.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export class MockLinkyRepository implements LinkyRepository {
  constructor(private consommationElectrique: ConsommationElectrique[]) {}

  recupererConsommationElectrique(_idUtilsateur: string): Promise<ConsommationElectrique[]> {
    return Promise.resolve(this.consommationElectrique);
  }

  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }
}
