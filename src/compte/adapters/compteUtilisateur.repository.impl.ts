import { CompteUtilisateur, CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";
import { AxiosFactory } from "@/axios.factory";

interface CompteUtilisateurApiModel {
  name: string;
  email?: string;
  code_postal?: string;
}
export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CompteUtilisateurApiModel>(`/utilisateurs/${idUtilisateur}/profile`);
    return {
      nom: response.data.name,
      id: idUtilisateur,
      mail: response.data.email || "",
      codePostal: response.data.codePostal || "",
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
}
