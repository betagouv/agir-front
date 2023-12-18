import { ServicePresenter } from '@/services/ports/service.presenter';
import { Service } from '@/services/recupererServiceActifs.usecase';

export interface ServiceViewModel {
  titre: string;
  contenu: string;
  url: string;
  isUrlExterne: boolean;
}

export class ServicePresenterImpl implements ServicePresenter {
  constructor(private serviceViewModels: (services: ServiceViewModel[]) => void) {}
  present(services: Service[]): void {
    this.serviceViewModels(
      services.map(service => ({
        titre: service.titre,
        contenu: service.contenu,
        url: service.isUrlExterne ? service.url : `/${service.url}`,
        isUrlExterne: service.isUrlExterne,
      }))
    );
  }
}
