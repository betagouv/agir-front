import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class RecommandationPersonnaliseAEteCliqueeUsecase {
  constructor(
    private readonly recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository,
    private readonly todoListEventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.recommandationsPersonnaliseesRepository.recommandationAEteCliquee(idUtilisateur);
    this.todoListEventBus.publish(ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE);
  }
}
