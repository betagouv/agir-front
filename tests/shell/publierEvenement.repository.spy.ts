import { Evenemement, PublierEvenementRepository } from '@/shell/ports/publierEvenement.repository';

export class PublierEvenementRepositorySpy implements PublierEvenementRepository {
  get evenementPublie(): Evenemement | null {
    return this._evenementPublie;
  }
  private _evenementPublie: Evenemement | null = null;

  publierEvenement(utilisateurId: string, evenement: Evenemement): Promise<void> {
    this._evenementPublie = evenement;
    return Promise.resolve();
  }
}
