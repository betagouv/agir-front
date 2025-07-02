import { InscriptionPresenter } from '@/domaines/simulationWattWatchers/ports/inscription.presenter';

export class InscriptionPresenterImpl implements InscriptionPresenter {
  constructor(
    private readonly onInscriptionOK: () => void,
    private readonly onInscriptionKO: () => void,
  ) {}

  public presenteInscriptionOk(): void {
    this.onInscriptionOK();
  }

  public presenteInscriptionErreur(): void {
    this.onInscriptionKO();
  }
}
