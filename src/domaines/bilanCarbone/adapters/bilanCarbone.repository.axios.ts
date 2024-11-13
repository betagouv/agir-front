import { AxiosFactory, intercept401 } from '@/axios.factory';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarboneApiModel2 {
  pourcentage_completion_totale: number;
  bilan_complet: {
    impact_thematique: [
      {
        thematique: string;
        pourcentage: number;
        impact_kg_annee: number;
        emoji: string;
        details: [
          {
            label: string;
            emoji: string;
            pourcentage: number;
            pourcentage_categorie: number;
            impact_kg_annee: number;
          },
        ];
      },
    ];
    impact_kg_annee: number;
    top_3: [
      {
        label: string;
        emoji: string;
        pourcentage: number;
        pourcentage_categorie: number;
        impact_kg_annee: number;
      },
    ];
  };
  bilan_approximatif?: {
    impact_transport: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_alimentation: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_logement: 'moyen' | 'faible' | 'fort' | 'tres_fort';
    impact_consommation: 'moyen' | 'faible' | 'fort' | 'tres_fort';
  };
  liens_bilans_thematique: [
    {
      thematique: string;
      image_url: string;
      pourcentage_progression: number;
      nombre_total_question: number;
      temps_minutes: number;
      id_enchainement_kyc: string;
    },
  ];
}

export class BilanCarboneRepositoryAxios implements BilanCarboneRepository {
  @intercept401()
  async recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanCarboneApiModel2>(`/utilisateurs/${utilisateurId}/bilans/last_v3`);

    return {
      bilanCompletEstDispo: reponse.data.pourcentage_completion_totale === 100,
      pourcentageCompletionTotal: reponse.data.pourcentage_completion_totale,
      bilanComplet: {
        impactKgAnnuel: reponse.data.bilan_complet.impact_kg_annee,
        univers: reponse.data.bilan_complet.impact_thematique.map(detail => ({
          universId: detail.thematique,
          universLabel: detail.thematique,
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
        universBilan: reponse.data.liens_bilans_thematique.map(lien => ({
          contentId: lien.id_enchainement_kyc,
          estTermine: lien.pourcentage_progression === 100,
          label: lien.thematique,
          nombreTotalDeQuestion: lien.nombre_total_question,
          pourcentageProgression: lien.pourcentage_progression,
          urlImage: lien.image_url,
          clefUnivers: lien.thematique,
        })),
      },
      bilanPartiel: reponse.data.bilan_approximatif && {
        pourcentageCompletionTotal: reponse.data.pourcentage_completion_totale,
        alimentation: { niveau: reponse.data.bilan_approximatif.impact_alimentation },
        consommation: { niveau: reponse.data.bilan_approximatif.impact_consommation },
        logement: { niveau: reponse.data.bilan_approximatif.impact_logement },
        transport: { niveau: reponse.data.bilan_approximatif.impact_transport },
        universBilan: reponse.data.liens_bilans_thematique.map(lien => ({
          contentId: lien.id_enchainement_kyc,
          estTermine: lien.pourcentage_progression === 100,
          label: lien.thematique,
          nombreTotalDeQuestion: lien.nombre_total_question,
          pourcentageProgression: lien.pourcentage_progression,
          urlImage: lien.image_url,
          clefUnivers: lien.thematique,
        })),
      },
    };
  }
}
