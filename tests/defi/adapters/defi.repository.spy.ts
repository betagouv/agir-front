import { Question } from '@/kyc/recupererQuestionUsecase';
import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '@/defi/recupererListeDefis.usecase';

export class SpyDefiRepository implements DefiRepository {
  recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }
  recupererDefis(_utilisateurId: string): Promise<Defi[]> {
    throw new Error('Method not implemented.');
  }
  private _envoyerReponseAEteAppele: boolean = false;

  private _envoyerReponseArgs: { questionId: string; utilisateurId: string; reponse: string } = {
    questionId: '',
    utilisateurId: '',
    reponse: '',
  };

  recupererDefi(_defiId: string, _utilisateurId: string): Promise<Defi> {
    throw new Error('Method not implemented.');
  }

  envoyerReponse(_utilisateurId: string, _defiId: string, _reponse: string): Promise<void> {
    this._envoyerReponseAEteAppele = true;
    this._envoyerReponseArgs = {
      questionId: _defiId,
      utilisateurId: _utilisateurId,
      reponse: _reponse,
    };
    return Promise.resolve();
  }

  get envoyerReponseAEteAppele(): boolean {
    return this._envoyerReponseAEteAppele;
  }

  get envoyerReponseArgs() {
    return this._envoyerReponseArgs;
  }
}
