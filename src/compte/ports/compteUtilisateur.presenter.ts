import { CompteUtilisateur } from "@/compte/ports/compteUtilisateur.repository";

export interface CompteUtilisateurPresenter {
  presente(compteUtilisateur: CompteUtilisateur);
}
