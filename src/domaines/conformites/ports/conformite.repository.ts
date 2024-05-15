import { PageConformite, PageConformiteType } from '@/domaines/conformites/recupererPageConformite.usecase';

export interface ConformiteRepository {
  recupererPageConformite(pageConformiteType: PageConformiteType): Promise<PageConformite>;
}
