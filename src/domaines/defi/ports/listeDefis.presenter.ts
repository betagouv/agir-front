import { Defi } from '@/domaines/defi/recupererListeDefis.usecase';

export interface DefiQuestionViewModel {
  id: string;
  libelle: string;
  reponse: string;
  explication?: string;
}

export interface DefisQuestionViewModel {
  enCours: DefiQuestionViewModel[];
  termine: DefiQuestionViewModel[];
  abandonne: DefiQuestionViewModel[];
  pasDeDefi: boolean;
}
export interface ListeDefisPresenter {
  presente(defis: Defi[]): void;
}
