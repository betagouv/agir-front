import { ServiceRecherchePresDeChezNousPresenterDetail } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNousDetail.presenter';
import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';

export interface DetailServiceViewModel {
  titre: string;
  img: string;
  heuresOuvertures?: string;
  telephone?: string;
  siteWeb?: string;
  tag?: {
    label: string;
    style: string;
  };
  adresse?: string;
  description?: string;
  position?: { latitude: number; longitude: number };
}

export class ServiceRecherchePresDeChezNousPresenterDetailImpl
  implements ServiceRecherchePresDeChezNousPresenterDetail
{
  constructor(private serviceRechercheViewModel: (viewModel: DetailServiceViewModel) => void) {}

  presente(serviceRecherche: ServiceRecherchePresDeChezNousResultatDetail): void {
    const serviceRechercheViewModel: DetailServiceViewModel = {
      titre: serviceRecherche.titre,
      img: serviceRecherche.image,
      heuresOuvertures: serviceRecherche.heuresOuvertures,
      telephone: serviceRecherche.telephone,
      siteWeb: serviceRecherche.siteWeb,
      tag: serviceRecherche.distance
        ? {
            label: this.construireTag(serviceRecherche.distance),
            style: 'background--caramel text--background-caramel',
          }
        : undefined,
      adresse: serviceRecherche.adresse,
      description: serviceRecherche.description,
      position: serviceRecherche.position,
    };

    this.serviceRechercheViewModel(serviceRechercheViewModel);
  }

  private construireTag(distance: number): string {
    const distanceArrondie = Math.round(distance / 100) * 100;

    if (distanceArrondie >= 1000) {
      const distanceKm = distanceArrondie / 1000;
      return `À ${distanceKm.toFixed(1).replace('.', ',')} km`;
    }

    return `À ${distanceArrondie} m`;
  }
}
