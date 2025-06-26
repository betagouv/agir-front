import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

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
  categories_labels?: string[];
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
  sources?: string[];
}

export interface ServiceRechercheCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

interface ServiceRechercheLongueVieAuxObjetsApiResultatsModel {
  resultats: ServiceRechercheApiModel[];
  encore_plus_resultats_dispo: boolean;
}

export class ServiceRechercheLongueVieAuxObjetsAxios implements ServiceRechercheLongueVieAuxObjetsRepository {
  @intercept40X()
  async recupererService(
    idUtilisateur: string,
    categorie: string,
    nombreMaxResultats: number,
    coordonnees?: Coordonnees,
  ): Promise<ServiceRechercheLongueVieAuxObjets> {
    const idService = 'longue_vie_objets';
    const axiosInstance = AxiosFactory.getAxios();

    try {
      const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
        `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
      );

      const responseSuggestionsPromise = axiosInstance.post<ServiceRechercheLongueVieAuxObjetsApiResultatsModel>(
        `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search2`,
        {
          categorie,
          nombre_max_resultats: nombreMaxResultats,
          rayon_metres: 5000,
          latitude: coordonnees?.latitude,
          longitude: coordonnees?.longitude,
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
        const adresseFinale = elem.adresse_rue?.replace(/,\s*$/, '');

        return {
          id: elem.id,
          titre: elem.titre,
          adresse: adresseFinale,
          nombreMiseEnFavoris: elem.nombre_favoris,
          distance: elem.distance_metres,
          image: elem.image_url,
          categories: elem.categories_labels,
        };
      };

      return {
        estEnErreur: false,
        titre: 'Mon titre',
        suggestions: responseSuggestions.data.resultats.map(mapServiceRecherche),
        favoris: responseFavoris.data.length > 0 ? responseFavoris.data.map(mapServiceRecherche) : undefined,
        categories: responseCategorie.data.map(elem => ({
          code: elem.code,
          label: elem.label,
          estLaCategorieParDefaut: elem.is_default,
        })),
        plusDeResultatsDisponibles: responseSuggestions.data.encore_plus_resultats_dispo,
        nombreMaxResultats: nombreMaxResultats,
      };
    } catch {
      return {
        titre: '',
        suggestions: [],
        favoris: [],
        categories: [],
        estEnErreur: true,
        plusDeResultatsDisponibles: false,
        nombreMaxResultats: nombreMaxResultats,
      };
    }
  }

  @intercept40X()
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
      sources: reponse.data.sources,
    };
  }
}
