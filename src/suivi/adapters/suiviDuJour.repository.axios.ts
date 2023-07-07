import { DernierSuivi, SuiviRepository } from "@/suivi/ports/suivi.repository";
import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { AxiosFactory } from "@/axios.factory";
import { SuiviDuJourResultatsViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";
import impactDuJour from "@/components/ImpactDuJour.vue";

export interface SuiviDuJourGraphDataApiModel {
  date: string;
  valeur: number;
}
export interface SuiviDuJourApiModel {
  date_dernier_suivi: string;
  impact_dernier_suivi: number;
  variation: number;
  dernier_suivi: Map<string, string>;
  moyenne: number;
  derniers_totaux: SuiviDuJourGraphDataApiModel[];
}

export class SuiviDuJourRepositoryAxios implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {
    const axiosInstance = AxiosFactory.getAxios();
    const jsonObject = { type, ...Object.fromEntries(valeurs) };
    axiosInstance.post(`/utilisateurs/${utilisateurId}/suivis`, jsonObject, {});
  }

  async recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi> {
    const axiosInstance = AxiosFactory.getAxios();
    const data = await axiosInstance.get(`/utilisateurs/${idUtilisateur}/suivis/last?type=${type}`);

    const mapWithFullValues = new Map<string, string>(Object.entries(data.data));
    const mapWithoutAllValues = new Map<string, string>(Object.entries(data.data));
    mapWithoutAllValues.delete("date");
    const date = mapWithFullValues.get("date") || "";
    return {
      date: date,
      valeurs: mapWithoutAllValues,
    };
  }

  recupererResultat(): Resultat {
    return {
      impactCarbonDuJour: { valeur: "21", enHausse: true },
      suivisPrecedent: {
        datesDesSuivis: ["27/07", "28/07", "29/07", "30/07"],
        valeursDesSuivis: [23000, 43000, 12000, 25000],
        moyenneDesSuivis: 21000,
      },
      additionCarboneDuJour: [
        { valeur: 2, impactCarbone: 2000, titre: "viande_rouge" },
        { valeur: 20, impactCarbone: 8000, titre: "km_voiture" },
        { valeur: 10, impactCarbone: 4000, titre: "km_metro" },
        { valeur: 20, impactCarbone: 2000, titre: "km_velo" },
        { valeur: 15, impactCarbone: 80000, titre: "km_train" },
        { valeur: 40, impactCarbone: 16000, titre: "km_bus" },
        { valeur: 1, impactCarbone: 1000, titre: "viande_blanche" },
        { valeur: 1, impactCarbone: 1000, titre: "poisson_blanc" },
        { valeur: 2, impactCarbone: 2000, titre: "oeufs" },
        { valeur: 1, impactCarbone: 1000, titre: "poisson_rouge" },
      ],
    };
  }
}
