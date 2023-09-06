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
  image_url: string;
  url: string;
  seen: boolean;
  done: boolean;
  points: number;
  reco_score: number;
  content_id: string;
  locked: boolean;
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
        url: apiModel.url || "",
        aEteFaite: apiModel.done,
        idDuContenu: apiModel.content_id,
        duree: apiModel.duree,
        estBloquee: apiModel.locked,
      };
      return interaction;
    });
  }
  async interactionAEteCliquee(interactionId: string, utilisateurId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${utilisateurId}/interactions/${interactionId}`, {
      clicked: true,
    });
  }

  async interactionAEteTerminee(interactionId: string, utilisateurId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${utilisateurId}/interactions/${interactionId}`, {
      done: true,
    });
  }

  async interactionAvecDonneesAEteTerminee<T>(utilisateurId: string, interactionId: string, payload: T) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`utilisateurs/${utilisateurId}/interactions/${interactionId}`, {
      seen: 0,
      clicked: true,
      done: true,
      ...payload
    });}
}
