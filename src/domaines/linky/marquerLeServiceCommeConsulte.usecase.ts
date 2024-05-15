import { LinkyRepository } from '@/domaines/linky/ports/linkyRepository.repository';
import { ToDoListEvent } from '@/domaines/toDoList/toDoListEventBusImpl';
import { EventBus } from '@/shell/eventBus';

export class MarquerLeServiceCommeConsulteUsecase {
  constructor(
    private readonly linkyRepository: LinkyRepository,
    private readonly eventBus: EventBus<ToDoListEvent>,
  ) {}

  async execute(idUtilsateur: string): Promise<void> {
    await this.linkyRepository.marqueLeServiceCommeConsulte(idUtilsateur);
    this.eventBus.publish(ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE);
  }
}
