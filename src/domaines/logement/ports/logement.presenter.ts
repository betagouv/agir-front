import { LogementApiModel } from '@/domaines/logement/adapters/logement.repository.axios';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

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
