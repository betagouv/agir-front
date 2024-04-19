import { ProfileUtilisateur } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';
import { ProfileUtilisateurPresenter } from '@/profileUtilisateur/ports/profileUtilisateur.presenter';

export interface ProfileUtilisateurViewModel {
  nom: string;
  id: string;
  mail: string;
  prenom: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
}

export class ProfileUtilisateurPresenterImpl implements ProfileUtilisateurPresenter {
  constructor(private profileUtilisateurViewModel: (viewModel: ProfileUtilisateurViewModel) => void) {}

  present(profileUtilisateur: ProfileUtilisateur) {
    this.profileUtilisateurViewModel({
      nom: profileUtilisateur.nom,
      id: profileUtilisateur.id,
      mail: profileUtilisateur.mail,
      abonnementTransport: profileUtilisateur.abonnementTransport,
      prenom: profileUtilisateur.prenom,
      revenuFiscal: profileUtilisateur.revenuFiscal,
      nombreDePartsFiscales: profileUtilisateur.nombreDePartsFiscales,
    });
  }
}
