import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { ServiceEvent } from '@/domaines/services/serviceEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export interface Service {
  id: string;
  titre: string;
  contenu: string;
  url: string;
  isUrlExterne: boolean;
}

export class InstallerServiceActifUsecase {
  constructor(
    private serviceRepository: ServiceRepository,
    private serviceEventBus: EventBus<ServiceEvent>,
  ) {}
  async execute(utilisateurId, serviceId) {
    await this.serviceRepository.installerServiceActif(utilisateurId, serviceId);
    this.serviceEventBus.publish(ServiceEvent.SERVICE_INSTALLE);
  }
}
