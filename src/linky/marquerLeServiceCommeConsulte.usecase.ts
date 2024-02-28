import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';
import { EventBus } from '@/shell/eventBus';
import { ToDoListEvent } from '@/toDoList/toDoListEventBusImpl';

export class MarquerLeServiceCommeConsulteUsecase {
  constructor(private readonly linkyRepository: LinkyRepository, private readonly eventBus: EventBus<ToDoListEvent>) {}

  async execute(idUtilsateur: string): Promise<void> {
    await this.linkyRepository.marqueLeServiceCommeConsulte(idUtilsateur);
    this.eventBus.publish(ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE);
  }
}
