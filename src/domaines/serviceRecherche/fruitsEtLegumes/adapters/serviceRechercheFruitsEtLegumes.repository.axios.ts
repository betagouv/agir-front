import { AxiosFactory, intercept40X } from '@/axios.factory';
import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/fruitsEtLegumes/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';
import { ServiceRechercheCategorieApiModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';

interface ServiceRechercheFruitsEtLegumesApiResultatsModel {
  resultats: ServiceRechercheFruitsEtLegumesApiModel[];
}

interface ServiceRechercheFruitsEtLegumesApiModel {
  id: string;
  titre: string;
  impact_carbone_kg: number;
  image_url: string;
  type_fruit_legume: 'legume' | 'fruit' | 'fruit_et_legume';
}

export class ServiceRechercheFruitsEtLegumesAxios implements ServiceRechercheFruitsEtLegumesRepository {
  @intercept40X()
  async recupererService(idUtilisateur: string, mois: string): Promise<ServiceRechercheFruitsEtLegumes> {
    const idService = 'fruits_legumes';
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const reponse = await axiosInstance.post<ServiceRechercheFruitsEtLegumesApiResultatsModel>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search2`,
      {
        categorie: mois,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    return {
      listeFruitsEtLegumes: reponse.data.resultats.map(elem => ({
        titre: elem.titre,
        impactCarboneKg: elem.impact_carbone_kg,
        urlImage: elem.image_url,
        type: elem.type_fruit_legume,
      })),
      categories: responseCategorie.data.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.is_default,
      })),
    };
  }
}
