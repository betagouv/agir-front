import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceEvent } from '@/services/serviceEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class InstallerServiceActifUsecase {
  constructor(private serviceRepository: ServiceRepository, private serviceEventBus: EventBus<ServiceEvent>) {}
  async execute(utilisateurId, serviceId) {
    await this.serviceRepository.installerServiceActif(utilisateurId, serviceId);
    this.serviceEventBus.publish(ServiceEvent.SERVICE_INSTALLE);
  }
}
