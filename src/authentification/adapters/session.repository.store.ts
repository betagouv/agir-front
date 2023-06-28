import { SessionRepository } from "@/authentification/authentifierUtilisateur.usecase";
import { Utilisateur } from "@/authentification/ports/utilisateur.repository";
import store from "@/store";

export class SessionRepositoryStore implements SessionRepository {
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    store.commit("utilisateur/setUtilisateur", utilisateur);
  }
}
