import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";
import { Interaction } from "../../src/interactions/chargerInteractions.usecase";
import { CliquerInteractionUsecase } from "../../src/interactions/cliquerInteraction.usecase";

class SpyInteractionCliqueeRepository implements InteractionsRepository {
  get aEteAppele(): boolean {
    return this._aEteAppele;
  }
  private _aEteAppele: boolean = false;
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([]);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {
    this._aEteAppele = true;
  }
}
describe("Fichier de tests concernant le clique sur une interaction", () => {
  it("Au clique sur une interaction on doit prevenir que celle-ci vient d'être cliquée", () => {
    // GIVEN
    const repository = new SpyInteractionCliqueeRepository();
    const useCase = new CliquerInteractionUsecase(repository);
    // WHEN
    useCase.execute("utilisateurId", "interactionId");
    // THEN
    expect(repository.aEteAppele).toBeTruthy();
  });
});
