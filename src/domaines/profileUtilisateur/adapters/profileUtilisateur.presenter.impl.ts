import { ProfileUtilisateur } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
import { ProfileUtilisateurPresenter } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.presenter';

export interface ProfileUtilisateurViewModel {
  nom: string;
  id: string;
  mail: string;
  prenom: string;
  pseudo: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  anneeNaissance?: string;
  nomPrenomModifiables: boolean;
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
      anneeNaissance: profileUtilisateur.anneeNaissance ? profileUtilisateur.anneeNaissance.toString() : undefined,
      pseudo: profileUtilisateur.pseudo,
      nomPrenomModifiables: profileUtilisateur.nomPrenomModifiables,
    });
  }
}
