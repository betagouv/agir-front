import { ServicePresenter } from '@/services/ports/service.presenter';
import { ServiceRepository } from '@/services/ports/service.repository';

export interface Service {
  label: string;
  url: string;
  isUrlExterne: boolean;
}

export class RecupererServiceActifsUsecase {
  constructor(private serviceRepository: ServiceRepository) {}

  public async execute(utilisateurId: string, presenter: ServicePresenter) {
    const servicesActifs = await this.serviceRepository.recupererServicesActifs(utilisateurId);
    presenter.present(servicesActifs);
  }
}
