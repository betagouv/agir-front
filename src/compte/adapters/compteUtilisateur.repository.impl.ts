import { CompteUtilisateur, CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { AxiosFactory } from '@/axios.factory';
import { Response } from 'redaxios';

interface CompteUtilisateurApiModel {
  id: string;
  name: string;
  email?: string;
  code_postal?: string;
  prenom: string
}
export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.get(
      `/utilisateurs/${idUtilisateur}/profile`
    );
    return {
      nom: response.data.name,
      id: idUtilisateur,
      mail: response.data.email || "",
      codePostal: response.data.code_postal || "",
      prenom: response.data.prenom
    };
  }

  async mettreAjour(compteUtilisateur: CompteUtilisateur) {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.patch(`/utilisateurs/${compteUtilisateur.id}/profile`, {
      name: compteUtilisateur.nom,
      email: compteUtilisateur.mail,
      code_postal: compteUtilisateur.codePostal,
    });
  }

  async creerCompteUtilisateur(nom: string, email: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: Response<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/`, {
      name: nom,
      email: email,
    });
    return {
      nom: response.data.name,
      id: response.data.id,
      mail: response.data.email || "",
      codePostal: response.data.code_postal || "",
      prenom: response.data.prenom
    };
  }

  async supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${idUtilisateur}`);
  }
}
