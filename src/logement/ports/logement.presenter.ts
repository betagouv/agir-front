import { Logement } from '@/logement/recupererInformationLogement.usecase';
import { LogementApiModel } from '@/logement/adapters/logement.repository.axios';

interface LogementPlusieursReponsesPossiblesViewModel<T> {
  valeur: T;
  reponsesPossibles: {
    label: string;
    value: T;
  }[];
}

export interface LogementViewModel {
  codePostal: string;
  commune: string;
  adultes: number;
  enfants: number;
  residence: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['type']>;
  proprietaire: LogementPlusieursReponsesPossiblesViewModel<boolean>;
  superficie: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['superficie']>;
  modeDeChauffage: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['chauffage']>;
  plusDeQuinzeAns: LogementPlusieursReponsesPossiblesViewModel<boolean>;
  dpe: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['dpe']>;
}

export interface LogementPresenter {
  presente(logement: Logement): void;
}
