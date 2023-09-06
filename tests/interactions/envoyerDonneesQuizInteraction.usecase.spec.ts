import { Interaction } from "../../src/interactions/chargerInteractions.usecase";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";
import {  EnvoyerDonneesQuizInteractionUsecase } from '../../src/interactions/envoyerDonneesQuizInteraction.usecase';

class InteractionsRepositoryForTest implements InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([]);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {}

  interactionAEteTerminee(interactionId: string, utilisateurId: string): void {}

  interactionAvecDonneesAEteTerminee<T>(utilisateurId: string, interactionId: string, payload: T) {
    if (utilisateurId === 'mauvais_id') return Promise.resolve(false);
    
    return Promise.resolve(true);
  }
}

describe("Fichier de tests pour envoyer le resultat d'un quizz", () => {
  it("En donnant un id d'utilisateur, l'id d'une interaction valide dans le cas d'un quiz, retourne true", async () => {
    // GIVEN
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(new InteractionsRepositoryForTest());
    const resultat = await usecase.execute('1', '2', 40);

    // THEN
    expect(resultat).toBeTruthy();
  });

  it("En donnant un id d'utilisateur, l'id d'une interaction non valide dans le cas d'un quiz, retourne false", async () => {
    // GIVEN
    // WHEN
    const usecase = new EnvoyerDonneesQuizInteractionUsecase(new InteractionsRepositoryForTest());
    const resultat = await usecase.execute('mauvais_id', '2', 40);

    // THEN
    expect(resultat).toBeFalsy();
  });
});
