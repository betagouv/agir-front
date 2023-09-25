import { Aides } from "@/aides/chargementAides.usecase";
import { ChargementAidesPresenter, AideViewModel, AidesViewModel } from "@/aides/ports/chargementAides.presenter";

export class ChargementAidesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (AidesViewModel: AidesViewModel) => void) { }

  private groupeParCategorie = (aides: Aides[]): AidesViewModel => {
    const map: AidesViewModel = {};

    aides.forEach(aide => {
      if (!map[aide.categorie]) {
        map[aide.categorie] = [];
      }

      const aideToPush: AideViewModel = {
        id: aide.id,
        titre: aide.titre,
        categorie: aide.categorie,
        contenu: aide.contenu,
        isSimulateur: aide.isSimulateur,
        url: aide.url
      }

      map[aide.categorie].push(aideToPush);
    });

    return map;
  };

  presente(aides: Aides[]): void {  
    const viewModel = this.groupeParCategorie(aides);
  
    this._viewModel(viewModel);
  }
}
