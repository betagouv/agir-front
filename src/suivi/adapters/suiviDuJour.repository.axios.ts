import { SuiviRepository } from "@/suivi/ports/suivi.repository";
import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { AxiosFactory } from "@/axios.factory";

export class SuiviDuJourRepositoryAxios implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {
    const axiosInstance = AxiosFactory.getAxios();
    const jsonObject = { type, ...Object.fromEntries(valeurs) };
    axiosInstance.post(`/utilisateurs/${utilisateurId}/suivis`, jsonObject, {});
  }

  recupererDernierSuivi(idUtilisateur: string, type: string) {}

  recupererResultat(): Resultat {
    return {
      valeur: "21",
      enHausse: true,
    };
  }
}
