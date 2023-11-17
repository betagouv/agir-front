import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';

export interface RecommandationsPersonnaliseesPresenter {
  presente(recommandationsPersonnalisees: RecommandationPersonnalisee[]): void;
}
