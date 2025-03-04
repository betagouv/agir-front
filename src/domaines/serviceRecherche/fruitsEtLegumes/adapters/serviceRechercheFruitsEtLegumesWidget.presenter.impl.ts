import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/fruitsEtLegumes/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceFruitsEtLegumesDetailWidgetViewModel {
  nom: string;
  urlImage: string;
}

export class ServiceRechercheFruitsEtLegumesWidgetPresenterImpl implements ServiceRechercheFruitsEtLegumesPresenter {
  constructor(
    private serviceFruitsEtLegumesViewModel: (viewModel: ServiceFruitsEtLegumesDetailWidgetViewModel[]) => void,
  ) {}

  presente(serviceRechercheFruitsEtLegumes: ServiceRechercheFruitsEtLegumes): void {
    this.serviceFruitsEtLegumesViewModel(
      serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
        .map(item => ({
          nom: item.titre,
          urlImage: item.urlImage,
        }))
        .slice(0, 15),
    );
  }
}
