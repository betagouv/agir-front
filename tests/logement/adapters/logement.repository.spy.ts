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

  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void> {
    return Promise.resolve(undefined);
  }
}
