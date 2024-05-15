import { RecommandationsPersonnaliseesRepository } from '@/domaines/recommandationsPersonnalisees/ports/recommandationsPersonnalisees.repository';
import { RecommandationPersonnalisee } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnalisees.usecase';

export class SpyRecommandationsPersonnaliseesRepository implements RecommandationsPersonnaliseesRepository {
  chargerRecommandationsPersonnaliseesUnivers(
    _idUnivers: string,
    _idUtilisateur: string,
  ): Promise<RecommandationPersonnalisee[]> {
    throw new Error('Method not implemented.');
  }
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
