import { CompteUtilisateur, CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";
import { AxiosFactory } from "@/axios.factory";
import { AxiosResponse } from "axios";

interface CompteUtilisateurApiModel {
  id: string;
  name: string;
  email?: string;
  code_postal?: string;
}
export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response: AxiosResponse<CompteUtilisateurApiModel> = await axiosInstance.get(`/utilisateurs/${idUtilisateur}/profile`);
    return {
      nom: response.data.name,
      id: idUtilisateur,
      mail: response.data.email || "",
      codePostal: response.data.code_postal || "",
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
    const response: AxiosResponse<CompteUtilisateurApiModel> = await axiosInstance.post(`/utilisateurs/`, {
      name: nom,
      email: email,
    });
    return {
      nom: response.data.name,
      id: response.data.id,
      mail: response.data.email || "",
      codePostal: response.data.code_postal || "",
    };
  }

  async supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${idUtilisateur}`);
  }
}
