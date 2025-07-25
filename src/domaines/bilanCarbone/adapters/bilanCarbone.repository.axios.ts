import { AxiosFactory, intercept40X } from '@/axios.factory';
import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone, ThematiqueBilan } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { BilanThematique, DetailBilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface LienBilanThematiqueAPI_v3 {
  thematique: string;
  image_url: string;
  pourcentage_progression: number;
  nombre_total_question: number;
  id_enchainement_kyc: string;
}

interface BilanCarboneApiModel {
  pourcentage_completion_totale: number;
  liens_bilans_thematique: LienBilanThematiqueAPI_v3[];
  bilan_complet?: {
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
}

interface BilanThematiqueApiModel {
  thematique: string;
  impact_kg_annee: number;
  emoji: string;
  details: {
    label: string;
    emoji: string;
    impact_kg_annee: number;
  }[];
}

export class BilanCarboneRepositoryAxios implements BilanCarboneRepository {
  @intercept40X()
  async recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanCarboneApiModel>(`/utilisateurs/${utilisateurId}/bilans/last_v3`);

    return {
      pourcentageCompletionTotal: reponse.data.pourcentage_completion_totale,
      bilanComplet: reponse.data.bilan_complet && {
        impactKgAnnuel: reponse.data.bilan_complet.impact_kg_annee,
        univers: reponse.data.bilan_complet.impact_thematique.map(detail => ({
          clefThematiqueAPI: detail.thematique as ClefThematiqueAPI,
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
      },
      bilanPartiel: reponse.data.bilan_approximatif && {
        pourcentageCompletionTotal: reponse.data.pourcentage_completion_totale,
        alimentation: { niveau: reponse.data.bilan_approximatif.impact_alimentation },
        consommation: { niveau: reponse.data.bilan_approximatif.impact_consommation },
        logement: { niveau: reponse.data.bilan_approximatif.impact_logement },
        transport: { niveau: reponse.data.bilan_approximatif.impact_transport },
      },
      thematiquesBilan: reponse.data.liens_bilans_thematique.map(lien => this.determineThematiqueBilan(lien)),
    };
  }

  @intercept40X()
  async recupererBilanDepuisThematique(idUtilisateur: string, thematique: ClefThematiqueAPI): Promise<BilanThematique> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<BilanThematiqueApiModel>(
      `/utilisateurs/${idUtilisateur}/bilans/last_v3/${thematique}`,
    );

    return new BilanThematique(
      reponse.data.impact_kg_annee,
      reponse.data.details.map(detail => new DetailBilanThematique(detail.label, detail.emoji, detail.impact_kg_annee)),
    );
  }

  private determineThematiqueBilan(liensBilansThematique: LienBilanThematiqueAPI_v3): ThematiqueBilan {
    return {
      contentId: liensBilansThematique.id_enchainement_kyc,
      estTermine: liensBilansThematique.pourcentage_progression === 100,
      label: liensBilansThematique.thematique,
      nombreTotalDeQuestion: liensBilansThematique.nombre_total_question,
      pourcentageProgression: liensBilansThematique.pourcentage_progression,
      urlImage: liensBilansThematique.image_url,
      clefUnivers: liensBilansThematique.thematique,
    };
  }
}
