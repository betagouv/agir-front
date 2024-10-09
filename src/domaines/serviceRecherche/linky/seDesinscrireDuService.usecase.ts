import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';
import { LinkyEvent } from '@/domaines/services/linkyEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class SeDesinscrireDuServiceUsecase {
  constructor(
    private serviceRechercheLinkyRepository: ServiceRechercheLinkyRepository,
    private readonly eventBus: EventBus<LinkyEvent>,
  ) {}

  async execute(utilisateurId: string) {
    await this.serviceRechercheLinkyRepository.seDesabonner(utilisateurId);
    this.eventBus.publish(LinkyEvent.DESABONNEMENT);
  }
}
