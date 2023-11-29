import { TerminerToDoListUsecase } from '@/toDoList/terminerToDoList.usecase';
import { SpyToDoListRepository } from './adapters/spyTodoListRepository';

describe("Fichier de tests concernant la fin d'une Todo List", () => {
  it('En donnant un id utilisateurdoit appeler le back pour prevenir que la todo entière a été faite', async () => {
    // GIVEN
    const spyToDoListRepository = new SpyToDoListRepository();

    const usecase = new TerminerToDoListUsecase(spyToDoListRepository);

    // WHEN
    await usecase.execute('utilisateurId');

    // THEN
    expect(spyToDoListRepository.terminerToDoAEteAppele).toBeTruthy();
  });
});
