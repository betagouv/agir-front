import { ElementSuiviCarbone, Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export enum ImpactCarboneCategorie {
  TRANSPORT_EN_COMMUN = "transport_en_commun",
  TRANSPORT_INDIVIDUEL = "transport_individuel",
  ALIMENTATION = "alimentation",
}

export interface ImpactCarboneDuJourViewModel {
  valeur: string;
  pictoSens: string;
  commentaire: string;
  variation: string;
}
export interface SuivisPrecedentViewModel {
  datesDesSuivis: string[];
  valeursDesSuivis: number[];
  moyenneDesSuivis: number[];
}

export interface LigneCarbone {
  valeur: string;
  impactCarbone: string;
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

  private getImpactCarboneCategorie(impactCarboneNature: string): ImpactCarboneCategorie {
    if (impactCarboneNature.includes("km") || impactCarboneNature.includes("velo") || impactCarboneNature.includes("pied")) {
      return ImpactCarboneCategorie.TRANSPORT_INDIVIDUEL;
    } else if (impactCarboneNature.includes("train") || impactCarboneNature.includes("metro") || impactCarboneNature.includes("bus")) {
      return ImpactCarboneCategorie.TRANSPORT_EN_COMMUN;
    }
    return ImpactCarboneCategorie.ALIMENTATION;
  }

  private getElementCarboneNature(valeur: string) {
    const valeurFinale = valeur.replace("_", " ");
    if (this.getImpactCarboneCategorie(valeur) == ImpactCarboneCategorie.ALIMENTATION) {
      return valeurFinale.replace("vegetarien", "légumes").replace("vegetalien", "sans produits animaux");
    }
    return valeurFinale;
  }

  private getValeurEmpreinteCarboneAvecLeFormatAttendu(titreDuDetail: string): string {
    if (this.getImpactCarboneCategorie(titreDuDetail) == ImpactCarboneCategorie.ALIMENTATION) {
      return "repas avec";
    } else if (this.getImpactCarboneCategorie(titreDuDetail) == ImpactCarboneCategorie.TRANSPORT_INDIVIDUEL) {
      return "km de";
    }
    return "minutes de";
  }

  private getDetailEmpreinteCarbone(carboneValeur: ElementSuiviCarbone, debut: string, fin: string): string {
    return `${carboneValeur.valeur} ${this.getValeurEmpreinteCarboneAvecLeFormatAttendu(carboneValeur.titre)} ${
      debut == "km" ? fin : this.getElementCarboneNature(carboneValeur.titre)
    }`;
  }

  private getMoyenneDesSuivis(resultat: Resultat): number[] {
    return new Array(resultat?.suivisPrecedent.datesDesSuivis.length).fill(resultat.suivisPrecedent.moyenneDesSuivis / 1000);
  }

  private getAdditionCarbone(listDesValeurs: ElementSuiviCarbone[]): LigneCarbone[] {
    const resultats: LigneCarbone[] = [];
    listDesValeurs.sort((element1, element2) => (element1.impactCarbone > element2.impactCarbone ? -1 : 1));

    for (let index = 0; index < listDesValeurs.length; index++) {
      const carboneValeur = listDesValeurs[index];
      const [debut, fin] = carboneValeur.titre.split("_");
      if (carboneValeur.valeur > 0) {
        resultats.push({
          valeur: this.getDetailEmpreinteCarbone(carboneValeur, debut, fin),
          impactCarbone: `+${carboneValeur.impactCarbone / 1000} kg`,
        });
      }
    }
    return resultats;
  }

  presente(resultat: Resultat) {
    this._viewModel({
      impactCarbonDuJour: {
        valeur: (resultat?.impactCarbonDuJour.valeur / 1000).toFixed(1),
        pictoSens: resultat?.impactCarbonDuJour.variation > 0 ? "fr-icon-arrow-right-up-circle-fill" : "fr-icon-arrow-right-down-circle-fill",
        commentaire: resultat?.impactCarbonDuJour.variation > 0 ? "En hausse" : "En baisse",
        variation: (resultat.impactCarbonDuJour.variation / 1000).toFixed(1),
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
