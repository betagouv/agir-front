import { InformationCompteur } from '@/linky/obtenirInformationCompteur.usecase';
import { ConsommationElectrique, LinkyRepository } from '../../../src/linky/ports/linkyRepository.repository';

export class LinkyRepositorySpy implements LinkyRepository {
  get marqueLeServiceCommeConsulteAEteAppele(): boolean {
    return this._marqueLeServiceCommeConsulteAEteAppele;
  }
  private _marqueLeServiceCommeConsulteAEteAppele: boolean = false;
  recupererConsommationElectriqueAnnuelle(idUtilsateur: string): Promise<ConsommationElectrique> {
    throw new Error('Method not implemented.');
  }
  recupererConsommationElectriqueQuatorzeJours(idUtilsateur: string): Promise<ConsommationElectrique> {
    throw new Error('Method not implemented.');
  }
  recupererInformationCompteur(idUtilsateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }
  marqueLeServiceCommeConsulte(idUtilsateur: string): Promise<void> {
    this._marqueLeServiceCommeConsulteAEteAppele = true;
    return Promise.resolve();
  }
}
