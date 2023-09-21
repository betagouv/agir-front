import { Aides } from "@/aides/chargementAides.usecase";
import { ChargementAidesPresenter, AideViewModel, AidesViewModel } from "@/aides/ports/chargementAides.presenter";

export class ChargementAidesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (AidesViewModel: AidesViewModel) => void) { }

  private groupeParCategorie = (aides: Aides[]): AidesViewModel => {
    const map: AidesViewModel = {};

    aides.forEach(element => {
      if (!map[element.categorie]) {
        map[element.categorie] = [];
      }

      const elementToPush: AideViewModel = {
        id: element.id,
        titre: element.titre,
        categorie: element.categorie,
        contenu: element.contenu,
        isSimulateur: true,
        url: element.url
      }

      map[element.categorie].push(elementToPush);
    });

    return map;
  };

  presente(aides: Aides[]): void {  
    const viewModel = this.groupeParCategorie(aides);
  
    this._viewModel(viewModel);
  }
}
