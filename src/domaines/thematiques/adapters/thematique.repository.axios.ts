import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

interface ThematiqueApiModel {
  titre: string;
  type: string;
  progression: number;
  cible_progression: number;
  is_locked: boolean;
  reason_locked: string;
  is_new: boolean;
  niveau: number;
  image_url: string;
}

interface MissionItemThematiqueApiModel {
  id: string;
  titre: string;
  content_id: string;
  progression: {
    current: number;
    target: number;
  };
  is_locked: boolean;
  is_reco: boolean;
  done: boolean;
  type: string;
  points: number;
  sont_points_en_poche: boolean;
  defi_status: 'en_cours' | undefined;
}
interface MissionThematiqueApiModel {
  id: string;
  titre: string;
  image_url: string;
  thematique_univers: string;
  thematique_univers_label: string;
  univers: string;
  univers_label: string;
  objectifs: MissionItemThematiqueApiModel[];
  done_at: Date | null;
  terminable: boolean;
  progression_kyc: {
    current: number;
    target: number;
  };
}

export class ThematiqueRepositoryAxios implements ThematiqueRepository {
  @intercept401()
  async recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<MissionThematiqueApiModel>(
      `/utilisateurs/${utilisateurId}/thematiques/${thematiqueId}/mission`,
    );

    return {
      idThematique: thematiqueId,
      titre: reponse.data.titre,
      univers: reponse.data.univers,
      urlImage: reponse.data.image_url,
      estTerminee: Boolean(reponse.data.done_at),
      estTerminable: reponse.data.terminable,
      items: reponse.data.objectifs.map(item => ({
        id: item.id,
        contentId: item.content_id,
        titre: item.titre,
        progression: 0,
        estBloquee: item.is_locked,
        points: item.points,
        aEteRealisee: item.done,
        type: item.type,
        estRecommande: item.is_reco,
        estEnCours: item.defi_status === 'en_cours',
        pointAEteRecolte: item.sont_points_en_poche,
      })),
      progressionKyc: {
        etapeCourante: reponse.data.progression_kyc.current,
        etapeTotal: reponse.data.progression_kyc.target,
      },
    };
  }

  @intercept401()
  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ThematiqueApiModel[]>(
      `/utilisateurs/${utilisateurId}/univers/${universId}/thematiques`,
    );
    return response.data.map(thematique => ({
      id: thematique.type,
      titre: thematique.titre,
      progression: {
        etapeActuelle: thematique.progression,
        etapeCible: thematique.cible_progression,
      },
      estBloquee: thematique.is_locked,
      raisonDuBlocage: thematique.reason_locked,
      estNouvelle: thematique.is_new,
      niveau: thematique.niveau,
      urlImage: thematique.image_url,
    }));
  }
  @intercept401()
  async recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/objectifs/${elementId}/gagner_points`, { element_id: elementId });
  }

  @intercept401()
  async terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${utilisateurId}/thematiques/${thematiqueId}/mission/terminer`);
  }
}
