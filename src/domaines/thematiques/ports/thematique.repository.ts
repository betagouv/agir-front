import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';

export interface Thematique {
  titre: string;
  id: string;
  progression: {
    etapeActuelle: number;
    etapeCible: number;
  };
  estBloquee: boolean;
  raisonDuBlocage: string;
  estNouvelle: boolean;
  niveau: number;
  urlImage: string;
  thematiqueParent: {
    clefAPI: string;
    label: string;
  };
}

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
  recupererMissionsThematiquesRecommandees(utilisateurId: string): Promise<Thematique[]>;
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique>;
  recupererPoints(idUtilisateur: string, elementId: string): Promise<void>;
  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void>;
}
