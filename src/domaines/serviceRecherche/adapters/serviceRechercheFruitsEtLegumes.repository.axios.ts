import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

interface ServiceRechercheFruitsEtLegumesApiModel {
  id: string;
  titre: string;
  impact_carbone_kg: number;
}

export class ServiceRechercheFruitsEtLegumesAxios implements ServiceRechercheFruitsEtLegumesRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, mois: string): Promise<ServiceRechercheFruitsEtLegumes[]> {
    const idService = 'fruits_legumes';
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.post<ServiceRechercheFruitsEtLegumesApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: mois,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    return reponse.data.map(elem => ({
      titre: elem.titre,
      impactCarboneKg: elem.impact_carbone_kg,
    }));
  }
}
