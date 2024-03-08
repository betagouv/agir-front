import { Logement } from '../../../src/logement/recupererInformationLogement.usecase';
import { LogementRepository } from '../../../src/logement/ports/logement.repository';

export class LogementRepositorySpy implements LogementRepository {
  private _enregistrerLesInformationsAEteAppele: boolean = false;

  private _enregistrerLesInformationsArgs: Logement | null = null;

  enregistrerLesInformations(_utilisateurId, logement): Promise<void> {
    this._enregistrerLesInformationsAEteAppele = true;
    this._enregistrerLesInformationsArgs = logement;
    return Promise.resolve();
  }

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    throw new Error('Method not implemented.');
  }

  get enregistrerLesInformationsAEteAppele(): boolean {
    return this._enregistrerLesInformationsAEteAppele;
  }

  get enregistrerLesInformationsArgs(): Logement | null {
    return this._enregistrerLesInformationsArgs;
  }
}
