import { CompteUtilisateur, CompteUtilisateurRepository } from "@/compte/ports/compteUtilisateur.repository";
import { AxiosFactory } from "@/axios.factory";

interface CompteUtilisateurApiModel {
  id: string;
  name: string;
  email?: string;
  codePostal?: string;
}
export class CompteUtilisateurRepositoryImpl implements CompteUtilisateurRepository {
  async getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<CompteUtilisateurApiModel>(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.name,
      id: response.data.id,
      mail: response.data.email || "",
      codePostal: response.data.codePostal || "",
    };
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}
}
