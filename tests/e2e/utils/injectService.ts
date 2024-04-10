import { ServiceApiModel } from '@/services/adapters/service.repository.axios';

export class InjectService {
  public avecServices(services: ServiceApiModel[]) {
    return services;
  }

  public vierge() {
    return [];
  }
}
