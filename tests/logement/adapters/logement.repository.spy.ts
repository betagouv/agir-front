import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';

export class LogementRepositorySpy implements LogementRepository {
  private _enregistrerLesInformationsAEteAppele: boolean = false;

  get enregistrerLesInformationsAEteAppele(): boolean {
    return this._enregistrerLesInformationsAEteAppele;
  }

  private _enregistrerLesInformationsArgs: Logement | null = null;

  get enregistrerLesInformationsArgs(): Logement | null {
    return this._enregistrerLesInformationsArgs;
  }

  enregistrerLesInformations(_utilisateurId, logement): Promise<void> {
    this._enregistrerLesInformationsAEteAppele = true;
    this._enregistrerLesInformationsArgs = logement;
    return Promise.resolve();
  }

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    throw new Error('Method not implemented.');
  }

  private _patcherLesInformationsAEteAppele: boolean = false;

  get patcherLesInformationsAEteAppele(): boolean {
    return this._patcherLesInformationsAEteAppele;
  }

  private _patcherLesInformationsArgs: Partial<Logement> | null = null;

  get patcherLesInformationsArgs(): Partial<Logement> | null {
    return this._patcherLesInformationsArgs;
  }

  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void> {
    this._patcherLesInformationsAEteAppele = true;
    this._patcherLesInformationsArgs = logement;
    return Promise.resolve();
  }
}
