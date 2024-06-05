import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { Defi } from '@/domaines/defi/recupererDefisEnCoursOuAFaire.usecase';

export class MockDefiRepository implements DefiRepository {
  constructor(private defiARetourner: Defi) {}
  recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }

  recupererDefisEnCoursOuAFaire(_utilisateurId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }

  recupererDefi(_defiId: string, _utilisateurId: string): Promise<Defi> {
    return Promise.resolve(this.defiARetourner);
  }

  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
