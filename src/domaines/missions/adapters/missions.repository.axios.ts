import { AxiosFactory, intercept401 } from '@/axios.factory';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface ThematiqueApiModel {
  titre: string;
  code: string;
  progression: number;
  cible_progression: number;
  is_new: boolean;
  image_url: string;
  thematique: string;
  thematique_label: string;
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
  thematique: string;
  objectifs: MissionItemThematiqueApiModel[];
  done_at: Date | null;
  terminable: boolean;
  progression_kyc: {
    current: number;
    target: number;
  };
}

export class MissionsRepositoryAxios implements MissionsRepository {
  @intercept401()
  async recupererDetailMission(missionId: string, utilisateurId: string): Promise<DetailMission> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<MissionThematiqueApiModel>(`/utilisateurs/${utilisateurId}/missions/${missionId}`);

    return {
      missionId: missionId,
      titre: reponse.data.titre,
      clefApiThematique: reponse.data.thematique as ClefThematiqueAPI,
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
  async recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ThematiqueApiModel[]>(`/utilisateurs/${utilisateurId}/tuiles_missions`);
    return response.data.map(thematique => ({
      id: thematique.code,
      titre: thematique.titre,
      progression: {
        etapeActuelle: thematique.progression,
        etapeCible: thematique.cible_progression,
      },
      estNouvelle: thematique.is_new,
      urlImage: thematique.image_url,
      thematiqueParent: {
        clefAPI: thematique.thematique,
        label: thematique.thematique_label,
      },
    }));
  }

  @intercept401()
  async recupererMissionsThematique(universId: string, utilisateurId: string): Promise<Mission[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ThematiqueApiModel[]>(
      `/utilisateurs/${utilisateurId}/thematiques/${universId}/tuiles_missions`,
    );
    return response.data.map(thematique => ({
      id: thematique.code,
      titre: thematique.titre,
      progression: {
        etapeActuelle: thematique.progression,
        etapeCible: thematique.cible_progression,
      },
      estNouvelle: thematique.is_new,
      urlImage: thematique.image_url,
      thematiqueParent: {
        clefAPI: thematique.thematique,
        label: thematique.thematique_label,
      },
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
    await axios.post(`/utilisateurs/${utilisateurId}/missions/${thematiqueId}/terminer`);
  }
}
