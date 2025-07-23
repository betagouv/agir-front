import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { EtatPrm } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';

export class LogementRepositorySpy implements LogementRepository {
  recupererAdresse(utilisateurId: string): Promise<Adresse> {
    throw new Error('Method not implemented.');
  }

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    throw new Error('Method not implemented.');
  }

  recupererEtatPrm(utilisateurId: string): Promise<EtatPrm> {
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
