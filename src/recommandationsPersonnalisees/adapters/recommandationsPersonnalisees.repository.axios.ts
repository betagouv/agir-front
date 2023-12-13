import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { InteractionType } from '@/shell/interactionType';

interface InteractionApiModel {
  id: string;
  type: string;
  titre: string;
  soustitre: string;
  thematique_gamification_titre: string;
  tags: string[];
  duree: string;
  image_url: string;
  url: string;
  seen: boolean;
  done: boolean;
  points: number;
  content_id: string;
  locked: boolean;
}
export class RecommandationsPersonnaliseesRepositoryAxios implements RecommandationsPersonnaliseesRepository {
  @intercept401()
  async chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<InteractionApiModel[]>(`/utilisateurs/${idUtilisateur}/interactions`);

    return response.data.map((apiModel: InteractionApiModel) => {
      const recommandationPersonnalisee: RecommandationPersonnalisee = {
        id: apiModel.id,
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        sousTitre: apiModel.soustitre,
        categorie: apiModel.thematique_gamification_titre,
        nombreDePointsAGagner: apiModel.points.toString(),
        illustrationURL: apiModel.image_url,
        url: apiModel.url || '',
        aEteFaite: apiModel.done,
        idDuContenu: apiModel.content_id,
        duree: apiModel.duree,
        estBloquee: apiModel.locked,
      };
      return recommandationPersonnalisee;
    });
  }
}
