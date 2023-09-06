import { CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";
import { CompteUtilisateurPresenter } from "@/compte/ports/compteUtilisateur.presenter";

export class ChargerCompteUtilisateurUsecase {
  private _compteUtilisateuRepository: CompteUtilisateurRepository;

  constructor(compteUtilisateuRepository: CompteUtilisateurRepository) {
    this._compteUtilisateuRepository = compteUtilisateuRepository;
  }

  execute(utilisateurId: string, compteUtilisateurPresenter: CompteUtilisateurPresenter) {
    this._compteUtilisateuRepository.getCompteUtilisateur(utilisateurId).then((compte) => compteUtilisateurPresenter.presente(compte));
  }
}
