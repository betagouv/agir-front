import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]>;

  chargerArticlesPersonnalisees(idUtilisateur: string, nombreMax: number): Promise<RecommandationPersonnalisee[]>;

  chargerRecommandationsPersonnaliseesThematique(
    idThematique: string,
    idUtilisateur: string,
  ): Promise<RecommandationPersonnalisee[]>;

  recommandationAEteCliquee(idUtilisateur: string): Promise<void>;
}
