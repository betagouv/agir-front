import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { ConsommationElectrique } from '@/linky/obtenirConsommationElectriqueAnnuelle.usecase';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export class MockLinkyRepository implements LinkyRepository {
  constructor(private consommationElectrique: ConsommationElectrique) {}

  recupererConsommationElectriqueAnnuelle(idUtilsateur: string): Promise<ConsommationElectrique> {
    return Promise.resolve(this.consommationElectrique);
  }

  recupererConsommationElectriqueDerniersJours(idUtilsateur: string): Promise<ConsommationElectrique> {
    throw new Error('Method not implemented.');
  }

  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }
}
