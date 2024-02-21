import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { EventBus } from '@/shell/eventBus';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';

export class RecommandationPersonnaliseAEteCliqueeUsecase {
  constructor(
    private readonly recommandationsPersonnaliseesRepository: RecommandationsPersonnaliseesRepository,
    private readonly todoListEventBus: EventBus<ToDoListEvent>
  ) {}

  async execute(idUtilisateur: string): Promise<void> {
    await this.recommandationsPersonnaliseesRepository.recommandationAEteCliquee(idUtilisateur);
    this.todoListEventBus.publish(ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE);
  }
}
