import { AxiosFactory, intercept401 } from '@/axios.factory';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarboneDetailApiModel {
  univers: string;
  univers_label: string;
  pourcentage: number;
  impact_kg_annee: number;
}

interface BilanCarboneApiModel {
  detail: BilanCarboneDetailApiModel[];
  impact_kg_annee: number;
}

export class BilanCarboneRepositoryAxios implements BilanCarboneRepository {
  @intercept401()
  async recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanCarboneApiModel>(`/utilisateur/${utilisateurId}/bilans/last`);

    return {
      impactKgAnnuel: reponse.data.impact_kg_annee,
      details: reponse.data.detail.map(detail => ({
        universId: detail.univers,
        universLabel: detail.univers_label,
        pourcentage: detail.pourcentage,
        impactKgAnnuel: detail.impact_kg_annee,
      })),
    };
  }
}
