import { CompteUtilisateurPresenter } from '@/domaines/compte/ports/compteUtilisateur.presenter';
import { CompteUtilisateur } from '@/domaines/compte/ports/compteUtilisateur.repository';

export interface CompteUtlisateurViewModel {
  nom: string;
  id: string;
  mail: string;
  prenom: string;
  fonctionnalitesDebloquees: string[];
}
export class CompteUtilisateurPresenterImpl implements CompteUtilisateurPresenter {
  private _compteUtlisateurViewModel: (viewModel: CompteUtlisateurViewModel) => void;

  constructor(compteUtlisateurViewModel: (viewModel: CompteUtlisateurViewModel) => void) {
    this._compteUtlisateurViewModel = compteUtlisateurViewModel;
  }

  presente(compteUtilisateur: CompteUtilisateur) {
    this._compteUtlisateurViewModel({
      nom: compteUtilisateur.nom,
      id: compteUtilisateur.id,
      mail: compteUtilisateur.mail,
      prenom: compteUtilisateur.prenom,
      fonctionnalitesDebloquees: compteUtilisateur.fonctionnalitesDebloquees,
    });
  }
}
