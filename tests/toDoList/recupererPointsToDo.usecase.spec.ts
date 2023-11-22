import { RecupererPointsToDoUsecase } from '@/toDoList/recupererPointsToDo.usecase';
import { SpyToDoListRepository } from './adapters/spyTodoListRepository';

describe('Fichier de tests concernant la récupération de points suite à une todo validée', () => {
  it("En donnant un id utilisateur et un id de todo doit appeler le back pour prevenir que l'interaction a été faite", async () => {
    // GIVEN
    const spyToDoListRepository = new SpyToDoListRepository();
    const usecase = new RecupererPointsToDoUsecase(spyToDoListRepository);

    // WHEN
    await usecase.execute('utilisateurId', 'elementId');

    // THEN
    expect(spyToDoListRepository.recupererToDoListAEteAppele).toBeTruthy();
  });
});
