import { Utilisateur, UtilisateurRepository } from "@/authentification/ports/utilisateur.repository";
import { AxiosFactory } from "@/axios.factory";

interface UtilisateurApiModel {
  name: string;
  id: string;
}
export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async getUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel[]>(`/utilisateurs?name=${nomUtilisateur}`);
    return {
      nom: response.data[0].name,
      id: response.data[0].id,
    };
  }
}
