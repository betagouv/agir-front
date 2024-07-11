import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheCategorieApiModel } from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.repository.axios';
import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

interface ServiceRechercheFruitsEtLegumesApiModel {
  id: string;
  titre: string;
  impact_carbone_kg: number;
  emoji: string;
  type_fruit_legume: 'legume' | 'fruit';
}

export class ServiceRechercheFruitsEtLegumesAxios implements ServiceRechercheFruitsEtLegumesRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, mois: string): Promise<ServiceRechercheFruitsEtLegumes> {
    const idService = 'fruits_legumes';
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const reponse = await axiosInstance.post<ServiceRechercheFruitsEtLegumesApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: mois,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    return {
      listeFruitsEtLegumes: reponse.data.map(elem => ({
        titre: elem.titre,
        impactCarboneKg: elem.impact_carbone_kg,
        emoji: elem.emoji,
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
