import { Response } from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
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
  annee_naissance?: number;
  situation_handicap: boolean;
}

export interface ProfileUtilisateur {
  id: string;
  nom: string;
  prenom: string;
  mail: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  anneeNaissance?: number;
  situationHandicap: boolean;
}

export interface ProfileUtilisateurAMettreAJour {
  id: string;
  nom: string;
  prenom: string;
  abonnementTransport: boolean;
  situationHandicap?: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  anneeNaissance?: number;
}

export class ProfileUtilisateurRepositoryAxiosImpl implements ProfileUtilisateurRepository {
  @intercept401()
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
      anneeNaissance: response.data.annee_naissance,
      situationHandicap: response.data.situation_handicap,
    };
  }

  @intercept401()
  async mettreAjour(profileUtilisateur: ProfileUtilisateurAMettreAJour) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${profileUtilisateur.id}/profile`, {
      nom: profileUtilisateur.nom,
      prenom: profileUtilisateur.prenom,
      revenu_fiscal: profileUtilisateur.revenuFiscal,
      nombre_de_parts_fiscales: profileUtilisateur.nombreDePartsFiscales,
      abonnement_ter_loire: profileUtilisateur.abonnementTransport,
      situation_handicap: profileUtilisateur.situationHandicap,
      annee_naissance: profileUtilisateur.anneeNaissance,
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
