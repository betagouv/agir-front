import { Defi } from '@/domaines/defi/defi';

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
