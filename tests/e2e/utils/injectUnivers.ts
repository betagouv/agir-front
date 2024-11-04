import { ThematiqueApiModel } from '@/domaines/thematiques/adapters/thematiques.repository.axios';

export class InjectUnivers {
  vierge(): ThematiqueApiModel[] {
    return [];
  }
  public avecUnivers(univers: ThematiqueApiModel[]): ThematiqueApiModel[] {
    return univers;
  }
}
