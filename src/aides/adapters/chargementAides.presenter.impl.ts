import { Aides } from "@/aides/chargementAides.usecase";
import { ChargementAidesPresenter, AidesViewModel } from "@/aides/ports/chargementAides.presenter";

export class ChargementAidesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (AidesViewModel: AidesViewModel) => void) { }

  private groupeParCategorie = (aides: Aides[]): AidesViewModel => {
    const map: AidesViewModel = {};

    aides.forEach(element => {
      if (!map[element.categorie]) {
        map[element.categorie] = [];
      }
      map[element.categorie].push(element);
    });

    return map;
  };

  presente(aides: Aides[]): void {  
    const viewModel = this.groupeParCategorie(aides);
  
    this._viewModel(viewModel);
  }
}
