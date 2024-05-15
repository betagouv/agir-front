import { ConsommationElectrique, LinkyRepository } from '@/domaines/linky/ports/linkyRepository.repository';
import { InformationCompteur } from '@/domaines/linky/obtenirInformationCompteur.usecase';

export class MockLinkyInformationRepository implements LinkyRepository {
  constructor(private informationCompteur: InformationCompteur) {}

  marqueLeServiceCommeConsulte(idUtilsateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererConsommationElectriqueAnnuelle(_idUtilsateur: string): Promise<ConsommationElectrique> {
    throw new Error('Method not implemented.');
  }

  recupererConsommationElectriqueQuatorzeJours(_idUtilsateur: string): Promise<ConsommationElectrique> {
    throw new Error('Method not implemented.');
  }

  recupererInformationCompteur(_idUtilsateur: string): Promise<InformationCompteur> {
    return Promise.resolve(this.informationCompteur);
  }
}
