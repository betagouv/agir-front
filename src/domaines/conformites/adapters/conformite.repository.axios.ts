import { AxiosFactory } from '@/axios.factory';
import { ConformiteRepository } from '@/domaines/conformites/ports/conformite.repository';
import { PageConformite, PageConformiteType } from '@/domaines/conformites/recupererPageConformite.usecase';

export class ConformiteRepositoryAxios implements ConformiteRepository {
  async recupererPageConformite(pageConformiteType: PageConformiteType): Promise<PageConformite> {
    const axios = AxiosFactory.getAxios();
    const pageConformiteResponse = await axios.get(`/pages_conformite/${pageConformiteType.valueOf()}`);
    return {
      texte: pageConformiteResponse.data.contenu,
      titre: pageConformiteResponse.data.titre,
    };
  }
}
