import { CompteUtilisateurPresenter } from '@/compte/ports/compteUtilisateur.presenter';
import { CompteUtilisateur } from '@/compte/ports/compteUtilisateur.repository';

export interface CompteUtlisateurViewModel {
  nom: string;
  id: string;
  mail: string;
  codePostal: string;
  commune: string;
  prenom: string;
  revenuFiscal: number;
  nombreDePartsFiscales: number;
  abonnementTransport: boolean;
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
      codePostal: compteUtilisateur.codePostal,
      commune: compteUtilisateur.commune,
      abonnementTransport: compteUtilisateur.abonnementTransport,
      prenom: compteUtilisateur.prenom,
      revenuFiscal: compteUtilisateur.revenuFiscal || 0,
      nombreDePartsFiscales: compteUtilisateur.nombreDePartsFiscales,
      fonctionnalitesDebloquees: compteUtilisateur.fonctionnalitesDebloquees,
    });
  }
}
