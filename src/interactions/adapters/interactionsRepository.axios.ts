import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";
import { Interaction, InteractionCategorie, InteractionType } from "@/interactions/chargerInteractions.usecase";
import { AxiosFactory } from "@/axios.factory";

export interface InteractionApiModel {
  id: string;
  type: string;
  titre: string;
  soustitre: string;
  categorie: string;
  tags: string[];
  duree: string;
  frequence: null;
  image_url: string;
  url: null;
  seen: boolean;
  done: boolean;
  points: number;
  reco_score: number;
}
export class InteractionsRepositoryAxios implements InteractionsRepository {
  async chargerInteractions(idUtilisateur: string): Promise<Interaction[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<InteractionApiModel[]>(`/utilisateurs/${idUtilisateur}/interactions`);

    return response.data.map((apiModel: InteractionApiModel) => {
      const interaction: Interaction = {
        id: apiModel.id,
        type: apiModel.type as InteractionType,
        titre: apiModel.titre,
        sousTitre: apiModel.soustitre,
        categorie: apiModel.categorie as InteractionCategorie,
        nombreDePointsAGagner: apiModel.points.toString(),
        miseEnAvant: apiModel.reco_score.toString(),
        illustrationURL: apiModel.image_url,
      };
      return interaction;
    });
  }
}
