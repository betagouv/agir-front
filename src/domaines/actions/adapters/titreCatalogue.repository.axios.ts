import { AxiosFactory } from '@/axios.factory';
import { TitreCatalogue, TitreCatalogueRepository } from '@/domaines/actions/ports/titreCatalogue.repository';

interface TitreCataloguePartenaireApiModel {
  code: string;
  titre: string;
  description: string;
  image_url: string;
}

export class TitreCatalogueRepositoryAxios implements TitreCatalogueRepository {
  async recupererTousLesTitres(): Promise<TitreCatalogue[]> {
    const axios = AxiosFactory.getAxios();
    const titresPartenaires = await axios.get<TitreCataloguePartenaireApiModel[]>('/selections');
    return titresPartenaires.data.map(titre => ({
      code: titre.code,
      titre: titre.titre,
      description: titre.description,
      image: titre.image_url,
    }));
  }
}
