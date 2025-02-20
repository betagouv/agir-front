import { AxiosFactory } from '@/axios.factory';
import { SyntheseThematiques, ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

interface SyntheseThematiquesApiModel {
  nom_commune: string;
  liste_thematiques: {
    thematique: string;
    nombre_recettes: number;
    nombre_actions: number;
    nombre_aides: number;
    nombre_simulateurs: number;
  }[];
}

export class ThematiqueRepositoryAxios implements ThematiqueRepository {
  async recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<SyntheseThematiquesApiModel>(`/utilisateurs/${utilisateurId}/thematiques`);

    return {
      commune: response.data.nom_commune,
      listeThematiques: response.data.liste_thematiques.map(thematique => ({
        thematique: thematique.thematique,
        nombreRecettes: thematique.nombre_recettes,
        nombreActions: thematique.nombre_actions,
        nombreAides: thematique.nombre_aides,
        nombreSimulateurs: thematique.nombre_simulateurs,
      })),
    };
  }
}
