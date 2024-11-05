import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { Defi } from '@/domaines/defi/defi';

export class SpyDefiRepository implements DefiRepository {
  private _envoyerReponseAEteAppele: boolean = false;

  private _envoyerReponseArgs: { questionId: string; utilisateurId: string; reponse: string; explication?: string } = {
    questionId: '',
    utilisateurId: '',
    reponse: '',
    explication: undefined,
  };

  recupererDefi(_defiId: string, _utilisateurId: string): Promise<Defi> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication: string): Promise<void> {
    this._envoyerReponseAEteAppele = true;
    this._envoyerReponseArgs = {
      questionId: defiId,
      utilisateurId: utilisateurId,
      reponse: reponse,
      explication,
    };
    return Promise.resolve();
  }

  get envoyerReponseAEteAppele(): boolean {
    return this._envoyerReponseAEteAppele;
  }

  get envoyerReponseArgs() {
    return this._envoyerReponseArgs;
  }

  recupererTousLesDefis(utilisateurId: string): Promise<Defi[]> {
    return Promise.resolve([]);
  }

  recupererListeDefisParThematique(_utilisateurId: string, _thematiqueId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }
}
