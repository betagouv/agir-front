import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesPresenter {
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void;
}
