import { SessionRepository } from "@/authentification/authentifierUtilisateur.usecase";
import { Utilisateur } from "@/authentification/ports/utilisateur.repository";
import { utilisateurStore } from "@/store/utilisateur";

export class SessionRepositoryStore implements SessionRepository {
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    const store = utilisateurStore();
    store.setUtilisateur(utilisateur);
  }
}
