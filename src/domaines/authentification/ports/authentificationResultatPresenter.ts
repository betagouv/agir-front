import { AuthentificationResultat } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';

export interface AuthentificationResultatPresenter {
  presente(cas: AuthentificationResultat): void;
}
