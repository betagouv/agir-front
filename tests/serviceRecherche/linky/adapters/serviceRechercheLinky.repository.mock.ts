import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { InformationCompteur } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';

export class ServiceRechercheLinkyRepositoryMock implements ServiceRechercheLinkyRepository {
  constructor(private informationCompteurARetourner: InformationCompteur) {}

  recupererInformationCompteur(_idUtilisateur: string): Promise<InformationCompteur> {
    return Promise.resolve(this.informationCompteurARetourner);
  }
}
