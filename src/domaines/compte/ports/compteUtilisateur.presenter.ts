import { CompteUtilisateur } from '@/domaines/compte/ports/compteUtilisateur.repository';

export interface CompteUtilisateurPresenter {
  presente(compteUtilisateur: CompteUtilisateur);
}
