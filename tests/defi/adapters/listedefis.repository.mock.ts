import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { Defi } from '@/domaines/defi/recupererDefisEnCoursOuAFaire.usecase';

export class MockListeDefisRepository implements DefiRepository {
  constructor(private defisARetourner: Defi[]) {}
  recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }
  recupererDefisEnCoursOuAFaire(_utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }
  recupererDefi(_questionId: string, _utilisateurId: string): Promise<Defi> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererTousLesDefis(utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve(this.defisARetourner);
  }
}
