import { AxiosFactory, intercept40X } from '@/axios.factory';
import {
  AccueilConnecte,
  AccueilConnecteRepository,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { utilisateurStore } from '@/store/utilisateur';

export type AccueilConnecteApiModel = {
  nom_commune: string;
  total_national_actions_faites: number;
  total_utilisateur_actions_faites: number;
  pourcentage_bilan_done: number;
  nombre_aides: number;
  nombre_recettes: number;
  bilan_carbone_total_kg: number;
  pourcentage_global_reco_done: number;
  pourcentage_alimentation_reco_done: number;
  pourcentage_consommation_reco_done: number;
  pourcentage_logement_reco_done: number;
  pourcentage_transport_reco_done: number;
};

export class AccueilConnecteRepositoryAxios implements AccueilConnecteRepository {
  @intercept40X()
  async recupererAccueilConnecte(utilisateurId: string): Promise<AccueilConnecte> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<AccueilConnecteApiModel>(`/utilisateurs/${utilisateurId}/home_board`);
    utilisateurStore().utilisateur.onboardingAEteRealise = true;
    return {
      commune: response.data.nom_commune,
      totalActionsNationalesFaites: response.data.total_national_actions_faites,
      totalActionsUtilisateurFaites: response.data.total_utilisateur_actions_faites,
      pourcentageCompletionBilan: response.data.pourcentage_bilan_done,
      nombreAides: response.data.nombre_aides,
      nombreRecettes: response.data.nombre_recettes,
      bilanCarboneTotalKg: response.data.bilan_carbone_total_kg,
      pourcentageGlobalRecommandations: response.data.pourcentage_global_reco_done,
      pourcentageAlimentationRecommandations: response.data.pourcentage_alimentation_reco_done,
      pourcentageTransportRecommandations: response.data.pourcentage_transport_reco_done,
      pourcentageLogementRecommandations: response.data.pourcentage_logement_reco_done,
      pourcentageConsommationRecommandations: response.data.pourcentage_consommation_reco_done,
    };
  }
}
