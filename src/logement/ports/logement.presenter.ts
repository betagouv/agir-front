import { Logement } from '@/logement/recupererInformationLogement.usecase';

interface LogementPlusieursReponsesPossiblesViewModel {
  valeur: string;
  reponsesPossibles: {
    label: string;
    value: string;
  }[];
}

export interface LogementViewModel {
  codePostal: string;
  commune: string;
  adultes: number;
  enfants: number;
  residence: LogementPlusieursReponsesPossiblesViewModel;
  proprietaire: LogementPlusieursReponsesPossiblesViewModel;
  superficie: LogementPlusieursReponsesPossiblesViewModel;
  modeDeChauffage: LogementPlusieursReponsesPossiblesViewModel;
  plusDeQuinzeAns: LogementPlusieursReponsesPossiblesViewModel;
  dpe: LogementPlusieursReponsesPossiblesViewModel;
}

export interface LogementPresenter {
  presente(logement: Logement): void;
}
