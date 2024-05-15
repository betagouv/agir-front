import { CelebrationRepository } from '@/domaines/celebration/ports/celebration.repository';

export class SpyCelebrationRepository implements CelebrationRepository {
  private _validerCelebrationAEteAppele: boolean = false;

  get validerCelebrationAEteAppele(): boolean {
    return this._validerCelebrationAEteAppele;
  }

  valider(_utilisateurId: string, _celebrationId: string): void {
    this._validerCelebrationAEteAppele = true;
  }
}
