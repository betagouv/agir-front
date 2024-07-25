import { AuthentificationResultat } from '@/domaines/authentification/authentifierUtilisateur.usecase';

export interface AuthentificationResultatPresenter {
  presente(cas: AuthentificationResultat): void;
}
