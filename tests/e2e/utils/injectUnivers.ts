import { UniversApiModel } from '@/univers/adapters/univers.repository.axios';

export class InjectUnivers {
  vierge(): UniversApiModel[] {
    return [];
  }
  public avecUnivers(univers: UniversApiModel[]): UniversApiModel[] {
    return univers;
  }
}
