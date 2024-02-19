import { ConsommationElectrique, LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';

export class MockLinkyRepository implements LinkyRepository {
  constructor(private consommationElectrique: ConsommationElectrique) {}

  recupererConsommationElectriqueAnnuelle(_idUtilsateur: string): Promise<ConsommationElectrique> {
    return Promise.resolve(this.consommationElectrique);
  }

  recupererConsommationElectriqueDerniersJours(_idUtilsateur: string): Promise<ConsommationElectrique> {
    return Promise.resolve(this.consommationElectrique);
  }

  recupererInformationCompteur(_idUtilsateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }
}
