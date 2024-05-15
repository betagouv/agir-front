import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Bibliotheque, BibliothequeRepository } from '@/domaines/bibliotheque/ports/bibliotheque.repository';

interface BibliothequeApiModel {
  contenu: {
    titre: string;
    soustitre: string;
    image_url: string;
    thematique_principale_label: string;
    content_id: string;
    favoris: boolean;
  }[];
  filtres: {
    code: string;
    label: string;
  }[];
}

export class BibliothequeRepositoryAxios implements BibliothequeRepository {
  @intercept401()
  async chargerBibliotheque(utilisateurId: string): Promise<Bibliotheque> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<BibliothequeApiModel>(`/utilisateurs/${utilisateurId}/bibliotheque`);

    return {
      ressources: response.data.contenu.map(ressource => ({
        titre: ressource.titre,
        description: ressource.soustitre,
        idDuContenu: ressource.content_id,
        thematique: ressource.thematique_principale_label,
        image: ressource.image_url,
        favoris: ressource.favoris,
      })),
      filtresThematiques: response.data.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
      })),
    };
  }

  @intercept401()
  async filtrerBibliotheque(
    utilisateurId: string,
    filtreThematiquesIds: string[],
    titre: string,
    filtreFavoris: boolean,
  ): Promise<Bibliotheque> {
    const axiosInstance = AxiosFactory.getAxios();

    const params = this.buildFiltres(filtreThematiquesIds, titre, filtreFavoris);

    const response = await axiosInstance.get<BibliothequeApiModel>(
      `/utilisateurs/${utilisateurId}/bibliotheque${params}`,
    );

    return {
      ressources: response.data.contenu.map(ressource => ({
        titre: ressource.titre,
        description: ressource.soustitre || '',
        idDuContenu: ressource.content_id,
        thematique: ressource.thematique_principale_label,
        image: ressource.image_url,
        favoris: ressource.favoris,
      })),
      filtresThematiques: response.data.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
      })),
    };
  }

  private buildFiltres(filtreThematiquesIds: string[], titre: string, filtreFavoris: boolean) {
    const thematiquesParam =
      filtreThematiquesIds.length > 0 ? `filtre_thematiques=${filtreThematiquesIds.join(',')}` : null;
    const titreParam = titre ? `titre=${titre}` : null;

    const paramsArray: string[] = [];
    if (thematiquesParam) {
      paramsArray.push(thematiquesParam);
    }
    if (titreParam) {
      paramsArray.push(titreParam);
    }
    if (filtreFavoris) {
      paramsArray.push('favoris=true');
    }

    return paramsArray.length > 0 ? `?${paramsArray.join('&')}` : '';
  }
}
