import { RecommandationsPersonnaliseesRepository } from '@/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';

export class SpyRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  get recommandationAEteCliqueeAEteAppelee(): boolean {
    return this._recommandationAEteCliqueeAEteAppelee;
  }

  private _recommandationAEteCliqueeAEteAppelee: boolean = false;

  chargerRecommandationsPersonnalisees(idUtilisateur: string): Promise<RecommandationPersonnalisee[]> {
    throw new Error('Method not implemented.');
  }

  recommandationAEteCliquee(idUtilisateur: string): Promise<void> {
    this._recommandationAEteCliqueeAEteAppelee = true;
    return Promise.resolve();
  }
}
