import { ActionsEvent } from '@/domaines/actions/actions.eventbus';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { EventBus } from '@/shell/eventBus';

export class FermerMessageResetUsecase {
  constructor(private readonly utilisateurRepository: UtilisateurRepository) {}

  async execute(idUtilisateur: string, bus: EventBus<ActionsEvent>): Promise<void> {
    await this.utilisateurRepository.terminerMessageReset(idUtilisateur);
    bus.publish(ActionsEvent.RESET_VU);
  }
}
