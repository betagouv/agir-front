import { Utilisateur, UtilisateurRepository } from "@/authentification/ports/utilisateur.repository";
import { AxiosFactory } from "@/axios.factory";

interface UtilisateurApiModel {
  name: string;
  id: string;
  code_postal: string;
}
export class UtilisateurRepositoryAxios implements UtilisateurRepository {
  async getUtilisateurAvecLeNom(nomUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel[]>(`/utilisateurs?name=${nomUtilisateur}`);
    return {
      nom: response.data[0].name,
      id: response.data[0].id,
      codePostal: response.data[0].code_postal,
    };
  }

  async getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<UtilisateurApiModel>(`/utilisateurs/${idUtilisateur}`);
    return {
      nom: response.data.name,
      id: response.data.id,
      codePostal: response.data.code_postal,
    };
  }
}
