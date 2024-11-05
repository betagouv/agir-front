import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { Defi } from '@/domaines/defi/defi';

export class MockDefiRepository implements DefiRepository {
  constructor(private defiARetourner: Defi) {}

  recupererListeDefisParThematique(_utilisateurId: string, _thematiqueId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }

  recupererDefi(_defiId: string, _utilisateurId: string): Promise<Defi> {
    return Promise.resolve(this.defiARetourner);
  }

  envoyerReponse(_utilisateurId: string, _defiId: string, _reponse: string, _explication?: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererTousLesDefis(_utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve([]);
  }
}
