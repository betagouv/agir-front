import { Collectivites } from '@/domaines/collectivites/entities/collectivites';

export interface CollectiviteRepository {
  chercherCollectivites(nom: string, limite: number): Promise<Collectivites>;
}
