import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '@/defi/recupererListeDefis.usecase';

export class MockDefiRepository implements DefiRepository {
  constructor(private defiARetourner: Defi) {}

  recupererDefis(_utilisateurId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }
  recupererDefi(_defiId: string, _utilisateurId: string): Promise<Defi> {
    return Promise.resolve(this.defiARetourner);
  }

  envoyerReponse(_defiId: string, _utilisateurId: string, _reponse: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
