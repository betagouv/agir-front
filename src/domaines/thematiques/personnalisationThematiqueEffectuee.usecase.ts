import { ActionsEvent } from '@/domaines/actions/actions.eventbus';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';
import { EventBus } from '@/shell/eventBus';

export class PersonnalisationThematiqueEffectueeUsecase {
  constructor(private readonly thematiquesRepository: ThematiquesRepository) {}

  async execute(
    idUtilisateur: string,
    clefThematiqueApi: ClefThematiqueAPI,
    eventBus: EventBus<ActionsEvent>,
  ): Promise<void> {
    await this.thematiquesRepository.terminerPersonnalisation(idUtilisateur, clefThematiqueApi);
    eventBus.publish(ActionsEvent.PERSONNALISATION_FAITE);
  }
}
