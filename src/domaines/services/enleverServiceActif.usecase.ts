import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { ServiceEvent } from '@/domaines/services/serviceEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class EnleverServiceActifUsecase {
  constructor(
    private serviceRepository: ServiceRepository,
    private serviceEventBus: EventBus<ServiceEvent>,
  ) {}
  async execute(utilisateurId, serviceId) {
    await this.serviceRepository.enleverServiceActif(utilisateurId, serviceId);
    this.serviceEventBus.publish(ServiceEvent.SERVICE_SUPPRIME);
  }
}
