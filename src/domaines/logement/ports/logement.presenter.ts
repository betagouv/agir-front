import { LogementApiModel } from '@/domaines/logement/adapters/logement.repository.axios';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

interface LogementPlusieursReponsesPossiblesViewModel<T> {
  valeur: T;
  reponsesPossibles: {
    label: string;
    value: T;
  }[];
}

export interface LogementViewModel {
  codePostal: string;
  commune_utilisee_dans_le_compte: string;
  commune_label: string;
  adultes: number;
  enfants: number;
  residence: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['type']>;
  proprietaire: LogementPlusieursReponsesPossiblesViewModel<boolean>;
  superficie: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['superficie']>;
  plusDeQuinzeAns: LogementPlusieursReponsesPossiblesViewModel<boolean>;
  dpe: LogementPlusieursReponsesPossiblesViewModel<LogementApiModel['dpe']>;
  coordonnees: Coordonnees;
  numeroRue: string;
  rue: string;
}

export interface LogementPresenter {
  presente(logement: Logement): void;
}
