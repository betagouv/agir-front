import { ServicePresenter } from '@/services/ports/service.presenter';
import { Service } from '@/services/recupererServiceActifs.usecase';

export interface ServiceViewModel {
  label: string;
  url: string;
  isUrlExterne: boolean;
}

export class ServicePresenterImpl implements ServicePresenter {
  constructor(private serviceViewModels: (services: ServiceViewModel[]) => void) {}
  present(services: Service[]): void {
    this.serviceViewModels(
      services.map(service => ({
        label: service.label,
        url: service.url,
        isUrlExterne: service.isUrlExterne,
      }))
    );
  }
}
