import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';

interface ServiceRechercheApiModel {
  id: string;
  titre: string;
  adresse_code_postal?: string;
  adresse_nom_ville?: string;
  adresse_rue?: string;
  site_web?: string;
  nombre_favoris: number;
  distance_metres: number;
  image_url: string;
  categories?: string[];
}

interface ServiceRechercheDetailApiModel {
  id: string;
  titre: string;
  adresse_code_postal?: string;
  adresse_nom_ville?: string;
  adresse_rue?: string;
  site_web?: string;
  nombre_favoris: number;
  distance_metres: number;
  image_url: string;
  phone: string;
  openhours_more_infos?: string;
  description: string;
  description_more: string;
  commitment: string;
  latitude: number;
  longitude: number;
}

export interface ServiceRechercheCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

export class ServiceRechercheLongueVieAuxObjetsAxios implements ServiceRechercheLongueVieAuxObjetsRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, categorie: string): Promise<ServiceRechercheLongueVieAuxObjets> {
    const idService = 'longue_vie_objets';
    const axiosInstance = AxiosFactory.getAxios();

    try {
      const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
        `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
      );

      const responseSuggestionsPromise = axiosInstance.post<ServiceRechercheApiModel[]>(
        `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
        {
          categorie,
          nombre_max_resultats: 0,
          rayon_metres: 5000,
        },
      );

      const responseFavorisPromise = axiosInstance.get<ServiceRechercheApiModel[]>(
        `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/favoris`,
      );

      const [responseSuggestions, responseFavoris] = await Promise.all([
        responseSuggestionsPromise,
        responseFavorisPromise,
      ]);
      const mapServiceRecherche = (elem: ServiceRechercheApiModel) => {
        const adresse_rue = elem.adresse_rue ? elem.adresse_rue + ', ' : '';
        const adresse_nom_ville = elem.adresse_nom_ville ? elem.adresse_nom_ville + ' - ' : '';
        const adresse_code_postal = elem.adresse_code_postal ? elem.adresse_code_postal : '';

        const adresseFinale = `${adresse_rue}${adresse_nom_ville}${adresse_code_postal}`;

        return {
          id: elem.id,
          titre: elem.titre,
          adresse: adresseFinale,
          nombreMiseEnFavoris: elem.nombre_favoris,
          distance: elem.distance_metres,
          image: elem.image_url,
          categories: elem.categories,
        };
      };

      return {
        estEnErreur: false,
        titre: 'Mon titre',
        suggestions: responseSuggestions.data.map(mapServiceRecherche),
        favoris: responseFavoris.data.length > 0 ? responseFavoris.data.map(mapServiceRecherche) : undefined,
        categories: responseCategorie.data.map(elem => ({
          code: elem.code,
          label: elem.label,
          estLaCategorieParDefaut: elem.is_default,
        })),
      };
    } catch {
      return {
        titre: '',
        suggestions: [],
        favoris: [],
        categories: [],
        estEnErreur: true,
      };
    }
  }

  @intercept401()
  async recupererDetail(
    idUtilisateur: string,
    idService: string,
  ): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail> {
    const axiosInstance = AxiosFactory.getAxios();

    const reponse = await axiosInstance.get<ServiceRechercheDetailApiModel>(
      `/utilisateurs/${idUtilisateur}/recherche_services/longue_vie_objets/last_results/${idService}`,
    );

    const adresse_rue = reponse.data.adresse_rue ? reponse.data.adresse_rue + ', ' : '';
    const adresse_nom_ville = reponse.data.adresse_nom_ville ? reponse.data.adresse_nom_ville + ' - ' : '';
    const adresse_code_postal = reponse.data.adresse_code_postal ? reponse.data.adresse_code_postal : '';

    const adresseFinale = `${adresse_rue}${adresse_nom_ville}${adresse_code_postal}`;

    return {
      titre: reponse.data.titre,
      adresse: adresseFinale,
      telephone: reponse.data.phone?.toString(),
      image: reponse.data.image_url,
      siteWeb: reponse.data.site_web,
      distance: reponse.data.distance_metres,
      heuresOuvertures: reponse.data.openhours_more_infos,
      description: reponse.data.description
        ? `${reponse.data.description} ${reponse.data.description_more || ''}`
        : undefined,
      position:
        reponse.data.latitude && reponse.data.longitude
          ? {
              latitude: reponse.data.latitude,
              longitude: reponse.data.longitude,
            }
          : undefined,
    };
  }
}
