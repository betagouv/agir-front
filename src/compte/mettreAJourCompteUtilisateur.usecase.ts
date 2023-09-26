import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';

export class MettreAJourCompteUtilisateurUsecase {
  private _compteUtilisateuRepository: CompteUtilisateurRepository;

  constructor(compteUtilisateuRepository: CompteUtilisateurRepository) {
    this._compteUtilisateuRepository = compteUtilisateuRepository;
  }

  execute(compteUtilisateurInput: CompteUtlisateurViewModel) {
    this._compteUtilisateuRepository.mettreAjour(compteUtilisateurInput);
  }
}
