import { Aides } from "@/aides/chargementAides.usecase";
import { ChargementAidesRepository } from "@/aides/ports/chargementAides.repository";

export class ChargementAidesInMemoryRepository implements ChargementAidesRepository {
  getAides(): Promise<Aides[]> {
    return Promise.resolve([
      {
        id: "id-1",
        titre: "Simulez vos aides pour l'achat d'un vélo",
        sousTitre: "",
        categorie: "🚗 Transport du quotidien",
        nombreDePointsAGagner: "25",
        miseEnAvant: "",
        type: "AIDE",
        illustrationURL: "https://picsum.photos/200/300",
        url: "mes-aides-velo",
        isUrlExterne: false,
        contenu: "<h3>Titre test</h3><p>lorem ipsum dolor test</p><ul><li>Item 1</li><li>Item 2</li></ul>",
        idDuContenu: "",
        isSimulateur: true,
      },
      {
        id: "id-2",
        titre: "Simulez vos aides pour convertir votre voiture thermique en électrique",
        sousTitre: "",
        categorie: "🚗 Transport du quotidien",
        nombreDePointsAGagner: "25",
        miseEnAvant: "",
        type: "AIDE",
        illustrationURL: "https://picsum.photos/200/300",
        url: "mes-aides-retrofit",
        isUrlExterne: false,
        contenu: "<h3>Titre test</h3><p>lorem ipsum dolor test</p>",
        idDuContenu: "",
        isSimulateur: false
      },
      {
        id: "id-3",
        titre: "Aide test",
        sousTitre: "",
        categorie: "🥦 Alimentation",
        nombreDePointsAGagner: "25",
        miseEnAvant: "",
        type: "AIDE",
        illustrationURL: "https://picsum.photos/200/300",
        url: "mes-aides-velo",
        isUrlExterne: false,
        contenu: "<h3>Titre test</h3><p>lorem ipsum dolor test</p>",
        idDuContenu: "",
        isSimulateur: true
      }
    ]);
  }
}
