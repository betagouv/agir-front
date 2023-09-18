import { CompteUtilisateurPresenterImpl, CompteUtlisateurViewModel } from "../../src/compte/adapters/compteUtilisateur.presenter.impl";
import { ChargerCompteUtilisateurUsecase } from "../../src/compte/chargerCompteUtilisateur.usecase";
import { CompteUtilisateur, CompteUtilisateurRepository } from "../../src/compte/ports/compteUtilisateur.repository";
import { MettreAJourCompteUtilisateurUsecase } from "../../src/compte/mettreAJourCompteUtilisateur.usecase";

class SypCompteUtilisateurRepository implements CompteUtilisateurRepository {
  get compteUtilisateur(): CompteUtilisateur {
    return this._compteUtilisateur;
  }
  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }
  private _aEteAppelee: boolean = false;
  private _compteUtilisateur: CompteUtilisateur = {
    id: "",
    nom: "",
    mail: "",
    codePostal: "",
  };
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error();
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {
    this._aEteAppelee = true;
    this._compteUtilisateur = compteUtilisateur;
  }

  creerCompteUtilisateur(nom: string, email: string): Promise<CompteUtilisateur> {
    throw Error();
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error();
  }
}

describe("Fichier de tests concernant la mise à jour du compte utilisateur", () => {
  it("Ma mise à jour doit appeler le repository", async () => {
    // GIVEN
    // WHEN
    const repository = new SypCompteUtilisateurRepository();
    const usecase = new MettreAJourCompteUtilisateurUsecase(repository);
    const viewModelInput: CompteUtlisateurViewModel = {
      id: "1",
      nom: "Dorian",
      mail: "mail@exemple.com",
      codePostal: "75000",
    };
    usecase.execute(viewModelInput);
    // THEN
    expect(repository.aEteAppelee).toBeTruthy();
    expect(repository.compteUtilisateur).toStrictEqual<CompteUtilisateur>({
      id: "1",
      nom: "Dorian",
      mail: "mail@exemple.com",
      codePostal: "75000",
    });
  });
});
