import { Defi } from '@/defi/recupererListeDefis.usecase';

export interface DefiQuestionViewModel {
  id: string;
  libelle: string;
  reponse: string;
}
export interface ListeDefisPresenter {
  presente(defis: Defi[]): void;
}
