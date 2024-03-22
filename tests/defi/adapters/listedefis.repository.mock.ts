import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '@/defi/recupererListeDefis.usecase';

export class MockListeDefisRepository implements DefiRepository {
  constructor(private defisARetourner: Defi[]) {}
  recupererDefis(_utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }
  recupererDefi(_questionId: string, _utilisateurId: string): Promise<Defi> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_questionId: string, _utilisateurId: string, _reponse: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
