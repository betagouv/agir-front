import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";
import { Interaction, InteractionCategorie, InteractionType } from "@/interactions/chargerInteractions.usecase";

export class InteractionsRepositoryInMemory implements InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([
      {
        id: "1",
        titre: "Faites le bilan du jour",
        sousTitre: "",
        categorie: InteractionCategorie.ALIMENTATION,
        nombreDePointsAGagner: "+25",
        miseEnAvant: "RECOMMANDÉ",
        type: InteractionType.KYC,
        illustrationURL: "illustrationURL",
        url: "",
      },
      {
        id: "2",
        titre: "Testez-vous sur les énergies fossiles",
        sousTitre: "5 questions pour tester vos connaissances",
        categorie: InteractionCategorie.ENERGIE,
        nombreDePointsAGagner: "+5",
        miseEnAvant: "NOUVEAU",
        type: InteractionType.QUIZ,
        illustrationURL: "illustrationURL",
        url: "",
      },
      {
        id: "3",
        titre: "Que faire de vos déchets ?",
        sousTitre: "Vidéo de Julien Vidal",
        categorie: InteractionCategorie.CONSOMMATION,
        nombreDePointsAGagner: "+5",
        miseEnAvant: "",
        type: InteractionType.ARTICLE,
        illustrationURL: "illustrationURL",
        url: "url",
      },
    ]);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {}
}
