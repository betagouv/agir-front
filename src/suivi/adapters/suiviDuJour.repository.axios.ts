import { SuiviRepository } from "@/suivi/ports/suivi.repository";
import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { AxiosFactory } from "@/axios.factory";

export class SuiviDuJourRepositoryAxios implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {
    const axiosInstance = AxiosFactory.getAxios();
    const jsonObject = { type, ...Object.fromEntries(valeurs) };
    axiosInstance.post(`/utilisateurs/${utilisateurId}/suivis`, jsonObject, {});
  }

  async recupererDernierSuivi(idUtilisateur: string, type: string): Promise<Map<string, string>> {
    const axiosInstance = AxiosFactory.getAxios();
    const data = await axiosInstance.get(`/utilisateurs/${idUtilisateur}/suivis/last?type=${type}`);
    return new Map<string, string>(Object.entries(data.data));
  }

  recupererResultat(): Resultat {
    return {
      valeur: "21",
      enHausse: true,
    };
  }
}
