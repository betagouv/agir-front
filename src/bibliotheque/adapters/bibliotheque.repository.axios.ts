import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Bibliotheque, BibliothequeRepository } from '@/bibliotheque/ports/bibliotheque.repository';

interface BibliothequeApiModel {
  contenu: {
    titre: string;
    soustitre: string;
    image_url: string;
    thematique_principale_label: string;
    content_id: string;
  }[];
  filtres: {
    code: string;
    label: string;
    selected: boolean;
  }[];
}

export class BibliothequeRepositoryAxios implements BibliothequeRepository {
  @intercept401()
  async chargerBibliotheque(utilisateurId: string, filtreThematiquesIds: string[]): Promise<Bibliotheque> {
    const axiosInstance = AxiosFactory.getAxios();
    const thematiquesParam =
      filtreThematiquesIds.length > 0 ? `?filtre_thematiques=${filtreThematiquesIds.join(',')}` : '';
    const response = await axiosInstance.get<BibliothequeApiModel>(
      `/utilisateurs/${utilisateurId}/bibliotheque${thematiquesParam}`
    );

    return {
      ressources: response.data.contenu.map(ressource => ({
        titre: ressource.titre,
        description: ressource.soustitre,
        contentId: ressource.content_id,
        thematique: ressource.thematique_principale_label,
        image: ressource.image_url,
      })),
      filtresThematiques: response.data.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
        checked: filtre.selected,
      })),
    };
  }
}
