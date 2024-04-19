import { Response } from 'redaxios';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ProfileUtilisateurPresenter } from '@/profileUtilisateur/ports/profileUtilisateur.presenter';
import { ProfileUtilisateurRepository } from '@/profileUtilisateur/ports/profileUtilisateur.repository';

export interface ProfileUtilisateurApiModel {
  id: string;
  nom: string;
  email: string;
  prenom: string;
  revenu_fiscal: number | null;
  nombre_de_parts_fiscales: number;
  abonnement_ter_loire: boolean;
}

export interface ProfileUtilisateur {
  id: string;
  nom: string;
  prenom: string;
  mail: string;
  abonnementTransport: boolean;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
}

export class ProfileUtilisateurRepositoryAxiosImpl implements ProfileUtilisateurRepository {
  @intercept401()
  async getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<ProfileUtilisateurApiModel> = await axiosInstance.get(
      `/utilisateurs/${idUtilisateur}/profile`,
    );
    return {
      nom: response.data.nom,
      id: idUtilisateur,
      mail: response.data.email || '',
      prenom: response.data.prenom || '',
      revenuFiscal: response.data.revenu_fiscal,
      nombreDePartsFiscales: response.data.nombre_de_parts_fiscales,
      abonnementTransport: response.data.abonnement_ter_loire,
    };
  }

  @intercept401()
  async mettreAjour(profileUtilisateur: ProfileUtilisateur) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${profileUtilisateur.id}/profile`, {
      nom: profileUtilisateur.nom,
      prenom: profileUtilisateur.prenom,
      email: profileUtilisateur.mail,
      revenu_fiscal: profileUtilisateur.revenuFiscal,
      nombre_de_parts_fiscales: profileUtilisateur.nombreDePartsFiscales,
      abonnement_ter_loire: profileUtilisateur.abonnementTransport,
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
