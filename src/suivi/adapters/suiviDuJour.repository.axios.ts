import { DernierSuivi, SuiviRepository } from "@/suivi/ports/suivi.repository";
import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { AxiosFactory } from "@/axios.factory";

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
      impactCarbonDuJour: {
        valeur: "21",
        enHausse: true,
      },
      suivisPrecedent: {
        datesDesSuivis: ["27/07", "28/07", "29/07", "30/07"],
        valeursDesSuivis: [23000, 43000, 12000, 25000],
      },
    };
  }
}
