import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
export interface SyntheseThematiques {
  commune: string;
  listeThematiques: {
    thematique: string;
    nombreRecettes: number;
    nombreActions: number;
    nombreAides: number;
    nombreSimulateurs: number;
  }[];
}

export interface ThematiquesRepository {
  terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void>;
  resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void>;
  recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques>;
  supprimerActionDesActionsRecommandees(
    utilisateurId: string,
    codeThematique: string,
    actionType: string,
    actionId: string,
  ): Promise<void>;
}
