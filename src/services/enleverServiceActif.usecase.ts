import { ServiceRepository } from '@/services/ports/service.repository';
import { ServiceEvent, ServiceEventBus } from '@/services/serviceEventBusImpl';

export class EnleverServiceActifUsecase {
  constructor(private serviceRepository: ServiceRepository, private serviceEventBus: ServiceEventBus) {}
  async execute(utilisateurId, serviceId) {
    await this.serviceRepository.enleverServiceActif(utilisateurId, serviceId);
    this.serviceEventBus.publish(ServiceEvent.SERVICE_SUPPRIME);
  }
}
