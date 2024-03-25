import { Defi } from '@/defi/recupererListeDefis.usecase';

interface DefiQuestionViewModel {
  id: string;
  libelle: string;
  reponse: string;
}

export interface DefisQuestionViewModel {
  enCours: DefiQuestionViewModel[];
  termine: DefiQuestionViewModel[];
  pasDeDefi: boolean;
}
export interface ListeDefisPresenter {
  presente(defis: Defi[]): void;
}
