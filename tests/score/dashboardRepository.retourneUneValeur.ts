import { Score, ScoreRepository } from "../../src/score/ports/scoreRepository";

export class ScoreRepositoryRetourneUneValeur implements ScoreRepository {
  private valeur: number = 0;
  constructor(valeur: number) {
    this.valeur = valeur;
  }

  async getScore(utilisateur: string): Promise<Score> {
    return {
      badges: [
        {
          titre: "mon super badge",
          date: "2023-06-20T13:16:15.408Z",
        },
      ],
      score: this.valeur,
    };
  }
}
