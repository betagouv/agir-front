import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Response } from 'redaxios';

interface CompteUtilisateurApiModel {
  id: string;
  nom: string;
  email?: string;
  code_postal?: string;
  prenom: string;
  revenu_fiscal: string;
}
export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  @intercept401()
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.get(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.nom,
      id: idUtilisateur,
      mail: response.data.email || '',
      codePostal: response.data.code_postal || '',
      prenom: response.data.prenom || '',
      revenuFiscal: response.data.revenu_fiscal || '',
    };
  }

  @intercept401()
  async mettreAjour(compteUtilisateur: CompteUtilisateur) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${compteUtilisateur.id}/profile`, {
      nom: compteUtilisateur.nom,
      prenom: compteUtilisateur.prenom,
      email: compteUtilisateur.mail,
      code_postal: compteUtilisateur.codePostal,
      revenu_fiscal: compteUtilisateur.revenuFiscal,
    });
  }

  @intercept401()
  async creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/`, {
      nom: compteUtilisateurACreer.nom,
      prenom: compteUtilisateurACreer.prenom,
      email: compteUtilisateurACreer.email,
      mot_de_passe: compteUtilisateurACreer.motDePasse,
      onboardingData: compteUtilisateurACreer.onboarding,
    });
    return {
      nom: response.data.nom,
      id: response.data.id,
      mail: response.data.email || '',
      codePostal: response.data.code_postal || '',
      prenom: response.data.prenom || '',
      revenuFiscal: response.data.revenu_fiscal || '',
    };
  }

  @intercept401()
  async supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${idUtilisateur}`);
  }
}
