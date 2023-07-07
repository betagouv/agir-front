import { ElementSuiviCarbone, Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export interface ImpactCarboneDuJourViewModel {
  valeur: string;
  pictoSens: string;
}
export interface SuivisPrecedentViewModel {
  datesDesSuivis: string[];
  valeursDesSuivis: number[];
  moyenneDesSuivis: number[];
}

export interface LigneCarbone {
  valeur: string;
  impactCarbone: string;
  styleFont: string;
}

export interface SuiviDuJourResultatsViewModel {
  impactCarbonDuJour: ImpactCarboneDuJourViewModel;
  suivisPrecedent: SuivisPrecedentViewModel;
  additionCarbone: LigneCarbone[];
}
export class SuiviDuJourPresenterImpl implements SuiviDuJourPresenter {
  private _viewModel: (suiviDuJourResultat: SuiviDuJourResultatsViewModel) => void;

  constructor(viewModel: (suiviDuJourResultat: SuiviDuJourResultatsViewModel) => void) {
    this._viewModel = viewModel;
  }

  getElementCarboneNature(valeur: string) {
    return valeur.replace("_", " ");
  }

  getAdditionCarbone(listDesValeurs: ElementSuiviCarbone[]): LigneCarbone[] {
    let resultats: LigneCarbone[] = [];
    listDesValeurs.sort((element1, element2) => (element1.impactCarbone > element2.impactCarbone ? -1 : 1));

    for (let index = 0; index < listDesValeurs.length; index++) {
      const carboneValeur = listDesValeurs[index];
      const [debut, fin] = carboneValeur.titre.split("_");
      resultats.push({
        valeur: this.getValeur(carboneValeur, debut, fin),
        impactCarbone: `+${carboneValeur.impactCarbone / 1000} kg`,
        styleFont: this.getStyleFont(index),
      });
    }
    return resultats;
  }

  private getValeur(carboneValeur: ElementSuiviCarbone, debut: string, fin: string): string {
    return `${carboneValeur.valeur} ${debut == "km" ? "km de" : "repas avec"} ${debut == "km" ? fin : this.getElementCarboneNature(carboneValeur.titre)}`;
  }

  private getStyleFont(index: number): string {
    return index < 3 ? "carbon-value-item-primary" : "carbon-value-item-secondary";
  }

  private getMoyenneDesSuivis(resultat: Resultat): number[] {
    return new Array(resultat?.suivisPrecedent.datesDesSuivis.length).fill(resultat.suivisPrecedent.moyenneDesSuivis / 1000);
  }
  presente(resultat: Resultat) {
    this._viewModel({
      impactCarbonDuJour: {
        valeur: resultat?.impactCarbonDuJour.valeur,
        pictoSens: resultat?.impactCarbonDuJour.enHausse ? "fr-icon-arrow-right-up-circle-fill" : "fr-icon-arrow-right-down-circle-fill",
      },
      suivisPrecedent: {
        datesDesSuivis: resultat?.suivisPrecedent.datesDesSuivis,
        valeursDesSuivis: resultat?.suivisPrecedent.valeursDesSuivis.map((impactCarbon) => impactCarbon / 1000),
        moyenneDesSuivis: this.getMoyenneDesSuivis(resultat),
      },
      additionCarbone: this.getAdditionCarbone(resultat?.additionCarboneDuJour),
    });
  }
}
