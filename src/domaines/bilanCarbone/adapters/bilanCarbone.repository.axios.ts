import { AxiosFactory, intercept401 } from '@/axios.factory';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarboneDetailUniversApiModel {
  label: string;
  pourcentage_categorie: number;
  impact_kg_annee: number;
  emoji: string;
}

interface BilanCarboneDetailApiModel {
  univers: string;
  univers_label: string;
  pourcentage: number;
  impact_kg_annee: number;
  emoji: string;
  details: BilanCarboneDetailUniversApiModel[];
}

interface BilanCarboneApiModel {
  bilan_complet: {
    impact_univers: BilanCarboneDetailApiModel[];
    impact_kg_annee: number;
    top_3: {
      label: string;
      emoji: string;
      pourcentage: number;
    }[];
  };
  bilan_synthese: {
    impact_transport: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_alimentation: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_logement: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_consommation: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    pourcentage_completion_totale: number;
    liens_bilans_univers: {
      id_enchainement_kyc: string;
      image_url: string;
      nombre_total_question: number;
      pourcentage_progression: number;
      univers_label: string;
      univers: string;
    }[];
  };
}

export class BilanCarboneRepositoryAxios implements BilanCarboneRepository {
  @intercept401()
  async recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanCarboneApiModel>(`/utilisateur/${utilisateurId}/bilans/last`);

    return {
      pourcentageCompletionTotal: reponse.data.bilan_synthese.pourcentage_completion_totale,
      bilanComplet: {
        impactKgAnnuel: reponse.data.bilan_complet.impact_kg_annee,
        univers: reponse.data.bilan_complet.impact_univers.map(detail => ({
          universId: detail.univers,
          universLabel: detail.univers_label,
          pourcentage: detail.pourcentage,
          impactKgAnnuel: detail.impact_kg_annee,
          emoji: detail.emoji,
          details: detail.details.map(detailUnivers => ({
            label: detailUnivers.label,
            pourcentage: detailUnivers.pourcentage_categorie,
            impactKgAnnuel: detailUnivers.impact_kg_annee,
            emoji: detailUnivers.emoji,
          })),
        })),
        top3: reponse.data.bilan_complet.top_3.map(top3 => ({
          emoji: top3.emoji,
          label: top3.label,
          pourcentage: top3.pourcentage.toString(),
        })),
        universBilan: reponse.data.bilan_synthese.liens_bilans_univers.map(lien => ({
          contentId: lien.id_enchainement_kyc,
          estTermine: lien.pourcentage_progression === 100,
          label: lien.univers_label,
          nombreTotalDeQuestion: lien.nombre_total_question,
          pourcentageProgression: lien.pourcentage_progression,
          urlImage: lien.image_url,
          clefUnivers: lien.univers,
        })),
      },
      bilanPartiel: {
        pourcentageCompletionTotal: reponse.data.bilan_synthese.pourcentage_completion_totale,
        alimentation: { niveau: reponse.data.bilan_synthese.impact_alimentation },
        consommation: { niveau: reponse.data.bilan_synthese.impact_consommation },
        logement: { niveau: reponse.data.bilan_synthese.impact_logement },
        transport: { niveau: reponse.data.bilan_synthese.impact_transport },
        universBilan: reponse.data.bilan_synthese.liens_bilans_univers.map(lien => ({
          contentId: lien.id_enchainement_kyc,
          estTermine: lien.pourcentage_progression === 100,
          label: lien.univers_label,
          nombreTotalDeQuestion: lien.nombre_total_question,
          pourcentageProgression: lien.pourcentage_progression,
          urlImage: lien.image_url,
          clefUnivers: lien.univers,
        })),
      },
    };
  }
}
