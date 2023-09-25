import { CreerCompteUtilisateurUsecase } from "../../src/compte/creerCompteUtilisateur.usecase";
import { SessionRepository } from "../../src/authentification/authentifierUtilisateur.usecase";
import { Utilisateur } from "../../src/authentification/ports/utilisateur.repository";
import { CompteUtilisateur, CompteUtilisateurRepository } from "../../src/compte/ports/compteUtilisateur.repository";

class SessionRepositoryForTest implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }
  private _utilisateur: Utilisateur = {
    id: "",
    nom: "",
    codePostal: "",
  };
  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }
}

class CompteUtilisateurForTest implements CompteUtilisateurRepository {
  creerCompteUtilisateur(nom: string, email: string): Promise<CompteUtilisateur> {
    return Promise.resolve({
      id: "id",
      nom: nom,
      mail: email,
      codePostal: "",
    });
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }
}
describe("Fichier de tests concernant la creation du compte utilisateur", () => {
  it("doit creer un compte et le sauvegarder en session", async () => {
    // GIVEN
    const compteACreer = {
      nom: "John",
      id: "",
      mail: "john@skynet.com",
      codePostal: "",
    };
    const sessionRepository = new SessionRepositoryForTest();
    const compteUtilisateurRepository = new CompteUtilisateurForTest();
    // WHEN
    const usecase = new CreerCompteUtilisateurUsecase(compteUtilisateurRepository, sessionRepository);
    await usecase.execute(compteACreer);
    // THEN
    expect(sessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: "id",
      nom: "John",
      codePostal: "",
    });
  });
});
