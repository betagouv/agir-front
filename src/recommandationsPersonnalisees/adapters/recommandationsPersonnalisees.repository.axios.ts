import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { InteractionType } from '@/shell/interactionType';
import axios from 'redaxios';

interface RecommandationApiModel {
  type: string;
  titre: string;
  soustitre: string;
  thematique_gamification: string;
  jours_restants: number | null;
  image_url: string;
  points: number;
  content_id: string;
}
export class RecommandationsPersonnaliseesRepositoryAxios implements RecommandationsPersonnaliseesRepository {
  @intercept401()
  async recommandationAEteCliquee(idUtilisateur: string): Promise<void> {
    await axios.post(`/utilisateurs/${idUtilisateur}/events`, {
      type: 'reco_clickée',
    });
  }
  @intercept401()
  async chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recommandations`,
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: RecommandationPersonnalisee = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        sousTitre: apiModel.soustitre,
        categorie: apiModel.thematique_gamification,
        nombreDePointsAGagner: apiModel.points.toString(),
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
        joursRestants: apiModel.jours_restants,
      };

      return recommandationPersonnalisee;
    });
  }
}
