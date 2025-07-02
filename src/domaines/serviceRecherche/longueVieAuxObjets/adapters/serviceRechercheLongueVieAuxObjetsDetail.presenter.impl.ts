import { ServiceRechercheLongueVieAuxObjetsPresenterDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjetsDetail.presenter';
import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export interface DetailLVAOViewModel {
  titre: string;
  tag?: {
    label: string;
    style: string;
  };
  adresse?: string;
  position?: Coordonnees;
  sources?: string[];
}

export class ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl
  implements ServiceRechercheLongueVieAuxObjetsPresenterDetail
{
  constructor(private serviceRechercheViewModel: (viewModel: DetailLVAOViewModel) => void) {}

  presente(serviceRecherche: ServiceRechercheLongueVieAuxObjetsResultatDetail): void {
    const serviceRechercheViewModel: DetailLVAOViewModel = {
      titre: serviceRecherche.titre,
      tag: serviceRecherche.distance
        ? {
            label: this.construireTag(serviceRecherche.distance),
            style: 'background--caramel text--background-caramel',
          }
        : undefined,
      adresse: serviceRecherche.adresse,
      position: serviceRecherche.position,
      sources: serviceRecherche.sources,
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
