import { RecommandationApiModel } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';

export class InjectRecommandations {
  public avecRecommandations(recommandations: RecommandationApiModel[]) {
    return recommandations;
  }

  public vierge() {
    return [];
  }
}
