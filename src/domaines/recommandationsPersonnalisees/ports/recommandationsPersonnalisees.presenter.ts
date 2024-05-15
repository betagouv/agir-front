import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesPresenter {
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void;
}
