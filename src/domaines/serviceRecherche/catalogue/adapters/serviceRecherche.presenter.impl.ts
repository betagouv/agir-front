import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/catalogue/ports/serviceRecherche.presenter';
import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';
import { RouteServiceName } from '@/router/services/routes';

interface ServiceRechercheViewModel {
  url: string;
  label: string;
  picto: string;
  legende: string;
  estServiceExterne: boolean;
}

export interface ServicesRechercheViewModel {
  services: ServiceRechercheViewModel[];
}

enum ServiceIdInterne {
  FRUITS_ET_LEGUMES = 'fruits_legumes',
  PRES_DE_CHEZ_VOUS = 'proximite',
  RECETTES = 'recettes',
  LINKY = 'linky',
  LONGUE_VIE_AUX_OBJETS = 'longue_vie_objets',
}

export class ServiceRecherchePresenterImpl implements ServiceRecherchePresenter {
  constructor(private serviceViewModel: (viewModel: ServicesRechercheViewModel) => void) {}

  presente(serviceRecherche: ServicesRecherche): void {
    const urls = {
      [ServiceIdInterne.FRUITS_ET_LEGUMES]: RouteServiceName.FRUITS_ET_LEGUMES,
      [ServiceIdInterne.PRES_DE_CHEZ_VOUS]: RouteServiceName.PROXIMITE,
      [ServiceIdInterne.RECETTES]: RouteServiceName.RECETTES,
      [ServiceIdInterne.LINKY]: RouteServiceName.LINKY,
      [ServiceIdInterne.LONGUE_VIE_AUX_OBJETS]: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
    };

    this.serviceViewModel({
      services: serviceRecherche.services.map(service => ({
        url: service.estServiceExterne ? service.externalUrl : urls[service.id],
        label: service.titre,
        picto: service.iconUrl,
        legende: service.sous_titre,
        estServiceExterne: service.estServiceExterne,
      })),
    });
  }
}
