import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class ThematiquesRepositoryAxios implements ThematiquesRepository {
  @intercept40X()
  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/thematiques/${clefThematiqueApi}/personnalisation_ok`);
  }

  @intercept40X()
  async resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/thematiques/${clefThematiqueApi}/reset_personnalisation`);
  }

  @intercept40X()
  async supprimerActionDesActionsRecommandees(
    utilisateurId: string,
    codeThematique: string,
    actionType: string,
    actionId: string,
  ): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.delete(
      `/utilisateurs/${utilisateurId}/thematiques/${codeThematique}/actions/${actionType}/${actionId}`,
    );
  }
}
