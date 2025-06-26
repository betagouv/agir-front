import { Response } from 'redaxios';
import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ProfileUtilisateurPresenter } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.presenter';
import { ProfileUtilisateurRepository } from '@/domaines/profileUtilisateur/ports/profileUtilisateur.repository';

export interface ProfileUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  prenom: string;
  revenu_fiscal: number | null;
  nombre_de_parts_fiscales: number;
  abonnement_ter_loire: boolean;
  jour_naissance?: number;
  mois_naissance?: number;
  annee_naissance?: number;
  pseudo: string;
  is_nom_prenom_modifiable: boolean;
}

export interface ProfileUtilisateur {
  id: string;
  nom: string;
  prenom: string;
  mail: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  dateNaissance?: {
    jour: number;
    mois: number;
    annee: number;
  };
  pseudo: string;
  nomPrenomModifiables: boolean;
}

export interface ProfileUtilisateurAMettreAJour extends ProfileUtilisateurFranceConnectAMettreAJour {
  nom: string;
  prenom: string;
  dateNaissance: {
    jour: number;
    mois: number;
    annee: number;
  };
}

export interface ProfileUtilisateurFranceConnectAMettreAJour {
  id: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  pseudo: string;
}

export class ProfileUtilisateurRepositoryAxiosImpl implements ProfileUtilisateurRepository {
  @intercept40X()
  async getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<ProfileUtilisateurApiModel> = await axiosInstance.get(
      `/utilisateurs/${idUtilisateur}/profile`,
    );
    return {
      nom: response.data.nom || '',
      id: idUtilisateur,
      mail: response.data.email || '',
      prenom: response.data.prenom || '',
      revenuFiscal: response.data.revenu_fiscal,
      nombreDePartsFiscales: response.data.nombre_de_parts_fiscales,
      abonnementTransport: response.data.abonnement_ter_loire,
      dateNaissance: response.data.jour_naissance
        ? {
            jour: response.data.jour_naissance,
            mois: response.data.mois_naissance!,
            annee: response.data.annee_naissance!,
          }
        : undefined,
      pseudo: response.data.pseudo || '',
      nomPrenomModifiables: response.data.is_nom_prenom_modifiable,
    };
  }

  @intercept40X()
  async mettreAjour(profileUtilisateur: ProfileUtilisateurAMettreAJour) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${profileUtilisateur.id}/profile`, {
      nom: profileUtilisateur.nom,
      prenom: profileUtilisateur.prenom,
      revenu_fiscal: profileUtilisateur.revenuFiscal,
      nombre_de_parts_fiscales: profileUtilisateur.nombreDePartsFiscales,
      abonnement_ter_loire: profileUtilisateur.abonnementTransport,
      jour_naissance: profileUtilisateur.dateNaissance.jour,
      mois_naissance: profileUtilisateur.dateNaissance.mois,
      annee_naissance: profileUtilisateur.dateNaissance.annee,
      pseudo: profileUtilisateur.pseudo,
    });
  }

  @intercept40X()
  async mettreAjourUtilisateurFranceConnecte(profileUtilisateur: ProfileUtilisateurAMettreAJour) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${profileUtilisateur.id}/profile`, {
      revenu_fiscal: profileUtilisateur.revenuFiscal,
      nombre_de_parts_fiscales: profileUtilisateur.nombreDePartsFiscales,
      abonnement_ter_loire: profileUtilisateur.abonnementTransport,
      pseudo: profileUtilisateur.pseudo,
    });
  }
}

export class ChargerProfileUtilisateurUsecase {
  constructor(private profileUtilisateurRepository: ProfileUtilisateurRepository) {}

  async execute(utilisateurId: string, profileUtilisateurPresenter: ProfileUtilisateurPresenter) {
    const profileUtilisateur = await this.profileUtilisateurRepository.getProfileUtilisateur(utilisateurId);
    profileUtilisateurPresenter.present(profileUtilisateur);
  }
}
