import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import { ConsommationElectriqueGlobal } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';

export class ServiceRechercheLinkyRepositoryMock implements ServiceRechercheLinkyRepository {
  constructor(private informationCompteurARetourner: InformationCompteur) {}

  seDesabonner(_idUtilsateur: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererInformationCompteur(_idUtilisateur: string): Promise<InformationCompteur> {
    return Promise.resolve(this.informationCompteurARetourner);
  }

  recupererConsommationElectrique(_idUtilsateur: string): Promise<ConsommationElectriqueGlobal> {
    throw new Error('Method not implemented.');
  }
}
