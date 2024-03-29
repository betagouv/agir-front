import { PageConformite, PageConformiteType } from '@/conformites/recupererPageConformite.usecase';

export interface ConformiteRepository {
  recupererPageConformite(pageConformiteType: PageConformiteType): Promise<PageConformite>;
}
