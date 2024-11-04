import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiquesRepository';

import { Thematique } from '@/domaines/thematiques/recupererThematique.usecase';

export interface ThematiqueApiModel {
  titre: string;
  type: string;
  image_url: string;
}

export class ThematiquesRepositoryAxios implements ThematiquesRepository {
  @intercept401()
  async recupererThematique(idUtilisateur: string, thematiqueId: string): Promise<Thematique> {
    const axios = AxiosFactory.getAxios();
    const thematiques = await axios.get<ThematiqueApiModel[]>(`/utilisateurs/${idUtilisateur}/univers`);
    const thematique = thematiques.data
      .filter(thematique => thematique.type === thematiqueId)
      .map<Thematique>(thematique => ({
        id: thematique.type,
        nom: thematique.titre,
        urlImage: thematique.image_url,
      }));
    return thematique[0];
  }
}
