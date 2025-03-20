import { AxiosFactory, intercept401 } from '@/axios.factory';
import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { InteractionType } from '@/shell/interactionType';

export interface RecommandationApiModel {
  type: string;
  titre: string;
  jours_restants: number | null;
  image_url: string;
  points: number;
  content_id: string;
  thematique_principale: string;
  status_defi: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
}

export class RecommandationsPersonnaliseesRepositoryAxios implements RecommandationsPersonnaliseesRepository {
  @intercept401()
  async chargerRecommandationsPersonnaliseesThematique(
    idThematique: string,
    idUtilisateur: string,
  ): Promise<RecommandationPersonnalisee[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/thematiques/${idThematique}/recommandations`,
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: RecommandationPersonnalisee = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        clefThematiqueAPI: apiModel.thematique_principale as ClefThematiqueAPI,
        nombreDePointsAGagner: apiModel.points.toString(),
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
        joursRestants: apiModel.jours_restants,
        points: apiModel.points,
      };

      return recommandationPersonnalisee;
    });
  }

  @intercept401()
  async recommandationAEteCliquee(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${idUtilisateur}/events`, {
      type: 'access_recommandations',
    });
  }

  @intercept401()
  async chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recommandations_v3`,
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: RecommandationPersonnalisee = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        clefThematiqueAPI: apiModel.thematique_principale as ClefThematiqueAPI,
        nombreDePointsAGagner: apiModel.points.toString(),
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
        joursRestants: apiModel.jours_restants,
        points: apiModel.points,
      };

      return recommandationPersonnalisee;
    });
  }

  async chargerArticlesPersonnalisees(
    idUtilisateur: string,
    nombreMax: number,
  ): Promise<RecommandationPersonnalisee[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const params = `?nombre_max=${nombreMax}&type=article`;
    const response = await axiosInstance.get<RecommandationApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recommandations_v3${params}`,
    );

    return response.data.map((apiModel: RecommandationApiModel) => {
      const recommandationPersonnalisee: RecommandationPersonnalisee = {
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        clefThematiqueAPI: apiModel.thematique_principale as ClefThematiqueAPI,
        nombreDePointsAGagner: apiModel.points.toString(),
        illustrationURL: apiModel.image_url,
        idDuContenu: apiModel.content_id,
        joursRestants: apiModel.jours_restants,
        points: apiModel.points,
      };

      return recommandationPersonnalisee;
    });
  }
}
