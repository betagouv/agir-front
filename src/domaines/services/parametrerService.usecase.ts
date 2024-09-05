import { LinkyEvent } from '@/domaines/services/linkyEventBusImpl';
import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { EventBus } from '@/shell/eventBus';

export class ParametrerServiceUsecase {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly eventBus: EventBus<LinkyEvent>,
  ) {}

  async execute(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void> {
    await this.serviceRepository.parametrerService(utilisateurId, serviceId, parametres);
    this.eventBus.publish(LinkyEvent.PRM_A_ETE_SUBMIT);
  }
}
