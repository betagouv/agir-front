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
  impact_univers: BilanCarboneDetailApiModel[];
  impact_kg_annee: number;
  top_3: {
    label: string;
    emoji: string;
    pourcentage: number;
  }[];
}

export class BilanCarboneRepositoryAxios implements BilanCarboneRepository {
  @intercept401()
  async recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanCarboneApiModel>(`/utilisateur/${utilisateurId}/bilans/last`);

    return {
      impactKgAnnuel: reponse.data.impact_kg_annee,
      univers: reponse.data.impact_univers.map(detail => ({
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
      top3: reponse.data.top_3.map(top3 => ({
        emoji: top3.emoji,
        label: top3.label,
        pourcentage: top3.pourcentage.toString(),
      })),
    };
  }
}
