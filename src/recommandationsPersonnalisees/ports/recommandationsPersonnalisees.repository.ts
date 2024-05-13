import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]>;
  chargerRecommandationsPersonnaliseesUnivers(
    idUnivers: string,
    idUtilisateur: string,
  ): Promise<RecommandationPersonnalisee[]>;
  recommandationAEteCliquee(idUtilisateur: string): Promise<void>;
}
