import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

export class ServiceRechercheConsommationLinkyRepositoryMock implements ServiceRechercheLinkyRepository {
  constructor(private consommationElectriqueGlobalARetourner: ConsommationElectriqueGlobal) {}

  seDesabonner(_idUtilsateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererInformationCompteur(_idUtilisateur: string): Promise<InformationCompteur> {
    throw new Error('Method not implemented.');
  }

  recupererConsommationElectrique(idUtilsateur: string): Promise<ConsommationElectriqueGlobal> {
    return Promise.resolve(this.consommationElectriqueGlobalARetourner);
  }
}
