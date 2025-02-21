import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class ThematiquesRepositoryAxios implements ThematiquesRepository {
  @intercept401()
  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/thematiques/${clefThematiqueApi}/personnalisation_ok`);
  }
}
