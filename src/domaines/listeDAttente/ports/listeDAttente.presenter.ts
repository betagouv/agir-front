import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';

export interface ListeDAttentePresenter {
  presente(reponse: ReponseInscription): void;
}
