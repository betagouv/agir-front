import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNousPresenterDetail } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNousDetail.presenter';

export interface ServiceRecherchePresDeChezNousResultatDetail {
  titre: string;
  image: string;
  adresse?: string;
  telephone?: string;
  heuresOuvertures?: string;
  siteWeb?: string;
  distance?: number;
  description?: string;
}

export class RecupererDetailServicePresDeChezNousUsecase {
  constructor(private readonly repository: ServiceRecherchePresDeChezNousRepository) {}

  async execute(idUtilisateur: string, idService: string, presenter: ServiceRecherchePresDeChezNousPresenterDetail) {
    const detail = await this.repository.recupererDetail(idUtilisateur, idService);
    presenter.presente(detail);
  }
}
