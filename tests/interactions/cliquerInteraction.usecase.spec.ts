import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";
import { Interaction } from "../../src/interactions/chargerInteractions.usecase";
import { CliquerInteractionUsecase } from "../../src/interactions/cliquerInteraction.usecase";

class SpyInteractionCliqueeRepository implements InteractionsRepository {
  get interactionAEteCliqueeAEteAppele(): boolean {
    return this._interactionAEteCliqueeAEteAppele;
  }
  private _interactionAEteCliqueeAEteAppele: boolean = false;
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([]);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {
    this._interactionAEteCliqueeAEteAppele = true;
  }

  interactionAEteTerminee(interactionId: string, utilisateurId: string): void {}

  interactionAvecDonneesAEteTerminee<T>(utilisateurId: string, interactionId: string, payload: T) {
    return Promise.resolve(true);
  }
}
describe("Fichier de tests concernant le clique sur une interaction", () => {
  it("Au clique sur une interaction on doit prevenir que celle-ci vient d'être cliquée", async () => {
    // GIVEN
    const repository = new SpyInteractionCliqueeRepository();
    const useCase = new CliquerInteractionUsecase(repository);
    // WHEN
    await useCase.execute("utilisateurId", "interactionId", "TYPE");
    // THEN
    expect(repository.interactionAEteCliqueeAEteAppele).toBeTruthy();
  });
});
