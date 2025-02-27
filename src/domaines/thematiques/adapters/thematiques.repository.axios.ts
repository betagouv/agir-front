import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { SyntheseThematiques, ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

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

export class ThematiquesRepositoryAxios implements ThematiquesRepository {
  @intercept401()
  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/thematiques/${clefThematiqueApi}/personnalisation_ok`);
  }

  @intercept401()
  async resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/thematiques/${clefThematiqueApi}/reset_personnalisation`);
  }

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
