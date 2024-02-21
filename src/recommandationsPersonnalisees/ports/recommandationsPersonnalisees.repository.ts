import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]>;
  recommandationAEteCliquee(idUtilisateur: string): Promise<void>;
}
