import { AxiosFactory } from '@/axios.factory';
import { ConformiteRepository } from '@/domaines/conformites/ports/conformite.repository';
import { PageConformiteType, PageConformite } from '@/domaines/conformites/recupererPageConformite.usecase';

export class ConformiteRepositoryCms implements ConformiteRepository {
  async recupererPageConformite(pageConformiteType: PageConformiteType): Promise<PageConformite> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const pageConformiteResponse = await axiosCMS.get(`/conformites/${pageConformiteType.valueOf()}`);
    return {
      texte: pageConformiteResponse.data.data.attributes.contenu,
      titre: pageConformiteResponse.data.data.attributes.Titre,
    };
  }
}
