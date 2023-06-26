import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";
import { Interaction } from "@/interactions/chargerInteractions.usecase";

export class InteractionsRepositoryInMemory implements InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Interaction[] {
    return [
      {
        titre: "Faites le bilan du jour",
        sousTitre: "",
        categorie: "Alimentation",
        nombreDePointsAGagner: "+25",
        miseEnAvant: "RECOMMANDÉ",
        type: "KYC",
      },
      {
        titre: "Testez-vous sur les énergies fossiles",
        sousTitre: "5 questions pour tester vos connaissances",
        categorie: "Énergie",
        nombreDePointsAGagner: "+5",
        miseEnAvant: "NOUVEAU",
        type: "QUIZ",
      },
      {
        titre: "Que faire de vos déchets ?",
        sousTitre: "Vidéo de Julien Vidal",
        categorie: "Énergie",
        nombreDePointsAGagner: "+5",
        miseEnAvant: "",
        type: "VIDEO",
      },
    ];
  }
}
