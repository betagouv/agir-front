import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

export class SpyServiceRechercheLinky implements ServiceRechercheLinkyRepository {
  private _seDesabonnerDuServiceAEteAppele: boolean = false;

  get seDesabonnerDuServiceAEteAppele(): boolean {
    return this._seDesabonnerDuServiceAEteAppele;
  }

  recupererConsommationElectrique(_idUtilsateur: string): Promise<ConsommationElectriqueGlobal> {
    throw new Error('Method not implemented.');
  }

  recupererInformationCompteur(_idUtilsateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }

  seDesabonner(_idUtilsateur: string): Promise<void> {
    this._seDesabonnerDuServiceAEteAppele = true;
    return Promise.resolve();
  }
}
