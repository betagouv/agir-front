import { AxiosFactory } from '@/axios.factory';
import {
  AccueilConnecte,
  AccueilConnecteRepository,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';

export type AccueilConnecteApiModel = {
  nom_commune: string;
  total_national_actions_faites: number;
  total_utilisateur_actions_faites: number;
  pourcentage_bilan_done: number;
  nombre_aides: number;
  nombre_recettes: number;
};

export class AccueilConnecteRepositoryAxios implements AccueilConnecteRepository {
  async recupererAccueilConnecte(utilisateurId: string): Promise<AccueilConnecte> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<AccueilConnecteApiModel>(`/utilisateurs/${utilisateurId}/home_board`);
    return {
      commune: response.data.nom_commune,
      totalActionsNationalesFaites: response.data.total_national_actions_faites,
      totalActionsUtilisateurFaites: response.data.total_utilisateur_actions_faites,
      pourcentageCompletionBilan: response.data.pourcentage_bilan_done,
      nombreAides: response.data.nombre_aides,
      nombreRecettes: response.data.nombre_recettes,
    };
  }
}
