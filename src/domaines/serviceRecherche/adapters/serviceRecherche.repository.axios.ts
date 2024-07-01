import { ServiceRechercheRepository } from '../ports/serviceRecherche.repository';
import { ServiceRecherche } from '../recupererServiceRecherche.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface ServiceRechercheApiModel {
  id: string;
  titre: string;
  adresse_code_postal?: string;
  adresse_nom_ville?: string;
  adresse_rue?: string;
  site_web?: string;
  nombre_favoris: number;
}

export class ServiceRechercheAxios implements ServiceRechercheRepository {
  @intercept401()
  async getService(idUtilisateur: string, idService: string): Promise<ServiceRecherche> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: 'lieux_collaboratifs',
        nombre_max_resultats: 0,
        rayon_metres: 0,
      },
    );

    return {
      titre: 'Mon titre',
      suggestions: response.data.map(elem => ({
        titre: elem.titre,
        adresse: `${elem.adresse_rue}, ${elem.adresse_nom_ville} - ${elem.adresse_code_postal}`,
        nombreMiseEnFavoris: elem.nombre_favoris,
      })),
    };
  }
}
