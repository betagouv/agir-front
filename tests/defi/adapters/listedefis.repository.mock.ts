import { Defi } from '@/domaines/defi/defi';
import { DefiRepository } from '@/domaines/defi/ports/defi.repository';

export class MockListeDefisRepository implements DefiRepository {
  constructor(private defisARetourner: Defi[]) {}

  recupererListeDefisParUnivers(_utilisateurId: string, _universId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }

  recupererDefi(_questionId: string, _utilisateurId: string): Promise<Defi> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_utilisateurId: string, _defiId: string, _reponse: string, _explication: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererTousLesDefis(utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }
}
