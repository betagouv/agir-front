import { AxiosFactory, intercept40X } from '@/axios.factory';
import { Bibliotheque, BibliothequeRepository } from '@/domaines/bibliotheque/ports/bibliotheque.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface BibliothequeApiModel {
  contenu: {
    titre: string;
    soustitre: string;
    image_url: string;
    thematique_principale: string;
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
  @intercept40X()
  async chargerBibliotheque(utilisateurId: string): Promise<Bibliotheque> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<BibliothequeApiModel>(`/utilisateurs/${utilisateurId}/bibliotheque_v2`);

    return {
      ressources: response.data.contenu.map(ressource => ({
        titre: ressource.titre,
        description: ressource.soustitre || '',
        idDuContenu: ressource.content_id,
        thematique: ressource.thematique_principale as ClefThematiqueAPI,
        thematiqueLabel: ressource.thematique_principale_label,
        image: ressource.image_url,
        favoris: ressource.favoris,
      })),
      filtresThematiques: response.data.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
      })),
    };
  }

  @intercept40X()
  async filtrerBibliotheque(
    utilisateurId: string,
    filtreThematiquesIds: string[],
    titre: string,
    filtreFavoris: boolean,
    filtreArticlesLus: boolean,
  ): Promise<Bibliotheque> {
    const axiosInstance = AxiosFactory.getAxios();

    const params = this.buildFiltres(filtreThematiquesIds, titre, filtreFavoris, filtreArticlesLus);

    const response = await axiosInstance.get<BibliothequeApiModel>(
      `/utilisateurs/${utilisateurId}/bibliotheque_v2${params}`,
    );

    return {
      ressources: response.data.contenu.map(ressource => ({
        titre: ressource.titre,
        description: ressource.soustitre || '',
        idDuContenu: ressource.content_id,
        thematiqueLabel: ressource.thematique_principale_label,
        thematique: ressource.thematique_principale as ClefThematiqueAPI,
        image: ressource.image_url,
        favoris: ressource.favoris,
      })),
      filtresThematiques: response.data.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
      })),
    };
  }

  private buildFiltres(
    filtreThematiquesIds: string[],
    titre: string,
    filtreFavoris: boolean,
    articleLus: boolean,
  ): string {
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
    if (filtreFavoris && articleLus) {
      paramsArray.push('include=favoris&include=lu');
    } else if (filtreFavoris) {
      paramsArray.push('include=favoris');
    } else if (articleLus) {
      paramsArray.push('include=lu');
    } else {
      paramsArray.push('include=tout');
    }

    return paramsArray.length > 0 ? `?${paramsArray.join('&')}` : '';
  }
}
